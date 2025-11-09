import db from 'src/configs/dbConfig';
import { TaskEntity } from '../schema/task.entity';
import { Task } from '../Task.model';
import { AppHelpers } from 'src/common/apphelpers';
import GenResponse, { StatusCode } from 'src/common/GenResponse';
import { TaskCreationDto } from '../dto/TaskCreation.dto';
import { Injectable } from '@nestjs/common';
import { eq, or, like, and, SQL } from 'drizzle-orm';
import { TasksFilterDto, TaskUpdateDto } from '../dto/index.dto';
import { Pagination } from 'src/common/Pagination.dto';

@Injectable()
export class TaskRepository {
  //#region OBSOLETE
  /**
   * Improper filtering after getting all Tasks
   * @deprecated since version 2.0 - Use getAllTasksWithFilter(paging?: TasksFilterDto) instead
   * @param {TasksFilterDto} paging - Function argument for filtering tasks
   * @returns {Promise<GenResponse<Task[]>>} Promise<GenResponse<Task[]>> - The filtered tasks
   */
  async getAllTasks(paging?: Pagination): Promise<GenResponse<Task[]>> {
    const tasks: GenResponse<Task[]> = GenResponse.Result([]);
    // Implementation for retrieving all tasks
    let pagedResult = paging;
    if (!pagedResult || !pagedResult.page || !pagedResult.pagesize) {
      pagedResult = new Pagination();
    }
    const result = await db
      .select()
      .from(TaskEntity)
      .offset(
        (pagedResult.page <= 1 ? 0 : pagedResult.page - 1) *
          pagedResult.pagesize,
      )
      .limit(pagedResult.pagesize);
    if (result && result.length > 0) {
      result.map((task) => {
        const taskModel: Task = {
          id: task.id,
          title: task.title,
          description: task.description,
          status: AppHelpers.validateTaskStatus(task.status),
        };
        tasks.data?.push(taskModel);
      });
    }
    return tasks.data!.length > 0
      ? GenResponse.Result(tasks.data!, 'success', StatusCode.OK)
      : GenResponse.Result<Task[]>([], '', StatusCode.NotFound);
  }
  //#endregion

  async getAllTasksWithFilter(
    paging?: TasksFilterDto,
  ): Promise<GenResponse<Task[]>> {
    const tasks: GenResponse<Task[]> = GenResponse.Result([]);
    // Implementation for retrieving all tasks
    let pagedResult = paging;
    if (!pagedResult) {
      pagedResult = new Pagination();
    }
    if (!pagedResult.page || !pagedResult.pagesize) {
      const defaultPaging = new Pagination();
      pagedResult.page = defaultPaging.page;
      pagedResult.pagesize = defaultPaging.pagesize;
    }

    if (pagedResult.pagesize > new Pagination().pagesize) {
      pagedResult.pagesize = 250;
    }
    let query = db
      .select()
      .from(TaskEntity)
      .$dynamic()
      .offset(
        (pagedResult.page <= 1 ? 0 : pagedResult.page - 1) *
          pagedResult.pagesize,
      )
      .limit(pagedResult.pagesize);

    // Build dynamic WHERE conditions
    const conditions: SQL[] = [];

    if (pagedResult.status) {
      const validStatus = AppHelpers.validateTaskStatus(pagedResult.status);
      conditions.push(eq(TaskEntity.status, validStatus));
    }
    if (pagedResult.search) {
      conditions.push(
        AppHelpers.safeSQL(
          or(
            like(TaskEntity.title, `%${pagedResult.search}%`),
            like(TaskEntity.description, `%${pagedResult.search}%`),
          ),
        ),
      );
    }
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // #region Query Script Debug
    const queryScript = query.toSQL();
    //#endregion

    // Execute query
    const result = await query;
    if (result && result.length > 0) {
      result.map((task) => {
        const taskModel: Task = {
          id: task.id,
          title: task.title,
          description: task.description,
          status: AppHelpers.validateTaskStatus(task.status),
        };
        tasks.data?.push(taskModel);
      });
    }
    return tasks.data!.length > 0
      ? GenResponse.Result(tasks.data!, 'success', StatusCode.OK)
      : GenResponse.Result<Task[]>([], '', StatusCode.NotFound);
  }

  async createTask(taskDto: TaskCreationDto): Promise<GenResponse<Task>> {
    const task: typeof TaskEntity.$inferInsert = {
      title: taskDto.title,
      description: taskDto.description || null,
    };
    const result = await db.insert(TaskEntity).values(task).returning();
    let createdTask: Task;
    const objResp = new Promise<GenResponse<Task>>((resolve) => {
      if (result && result.length > 0) {
        createdTask = {
          id: result[0].id,
          title: result[0].title,
          description: result[0].description,
          status: AppHelpers.validateTaskStatus(result[0].status),
        };
        resolve(
          GenResponse.Result(
            createdTask,
            'Task created successfully.',
            StatusCode.Created,
          ),
        );
      } else {
        resolve(GenResponse.Failed(createdTask, 'Task creation failed.', ''));
      }
    });
    return objResp;
  }

  async findTaskById(id: string): Promise<GenResponse<Task>> {
    let task = [TaskEntity.$inferSelect];
    try {
      task = await db.select().from(TaskEntity).where(eq(TaskEntity.id, id));
    } catch (ex) {
      console.log(`Error fetching task with id: ${id} :: [${ex}].`);
    }
    const taskFind: GenResponse<Task> = GenResponse.Result({} as Task);
    const objResp = new Promise<GenResponse<Task>>((resolve) => {
      if (task && task.length > 0) {
        taskFind.data = {
          ...task[0],
          status: AppHelpers.validateTaskStatus(task[0].status),
        };
        taskFind.isSuccess = true;
        taskFind.message = 'Task found';
        taskFind.statusCode = StatusCode.OK;
      } else {
        taskFind.isSuccess = false;
        taskFind.message = 'Task not found';
        taskFind.statusCode = StatusCode.NotFound;
      }
      resolve(taskFind);
    });
    return objResp;
  }

  async updateTask(taskUpdate: TaskUpdateDto): Promise<GenResponse<Task>> {
    if (taskUpdate == undefined || !taskUpdate.id) {
      return GenResponse.Failed<Task>(
        {} as Task,
        'Invalid task update data',
        '',
        StatusCode.BadRequest,
      );
    }
    const task = await db
      .select()
      .from(TaskEntity)
      .where(eq(TaskEntity.id, taskUpdate.id))
      .limit(1)
      .then((res) => (res.length > 0 ? res[0] : null));
    if (!task) {
      return GenResponse.Failed<Task>(
        {} as Task,
        'Task not found',
        '',
        StatusCode.NotFound,
      );
    }
    const taskFind: GenResponse<Task> = GenResponse.Result({} as Task);
    const objResp = new Promise<GenResponse<Task>>((resolve) => {
      if (task) {
        task.status = AppHelpers.validateTaskStatus(taskUpdate.status);
        task.title =
          taskUpdate.title !== undefined && taskUpdate.title !== null
            ? taskUpdate.title
            : task.title;
        task.description =
          taskUpdate.description !== undefined &&
          taskUpdate.description !== null
            ? taskUpdate.description
            : task.description;
        db.update(TaskEntity)
          .set({ ...task })
          .where(eq(TaskEntity.id, taskUpdate.id))
          .returning()
          .then((resp) => {
            if (resp && resp.length > 0) {
              taskFind.data = {
                ...resp[0],
                status: AppHelpers.validateTaskStatus(resp[0].status),
              };
              taskFind.isSuccess = true;
              taskFind.message = 'Task updated successfully';
              taskFind.statusCode = StatusCode.OK;
            } else {
              taskFind.isSuccess = false;
              taskFind.message = 'Task update failed';
              taskFind.statusCode = StatusCode.NotImplemented;
            }
            return resolve(taskFind);
          })
          .catch((ex) => {
            console.log(
              `Error updating task with id: ${taskUpdate.id} :: [${ex}].`,
            );
          });
      }
    });
    return objResp;
  }

  async deleteTask(id: string): Promise<GenResponse<boolean>> {
    let deleteResult: { id: string } | void = { id: '' };
    try {
      deleteResult = await db
        .delete(TaskEntity)
        .where(eq(TaskEntity.id, id))
        .returning({
          id: TaskEntity.id,
        })
        .then((res) => (res.length > 0 ? { id: res[0].id } : { id: '' }))
        .catch((ex) => {
          console.log(`Error deleting task with id: ${id} :: [${ex}].`);
        });
    } catch (ex) {
      console.log(`Error fetching task with id: ${id} :: [${ex}].`);
      return GenResponse.Failed<boolean>(
        false,
        'server error',
        null,
        StatusCode.ServerError,
      );
    }
    const objResp = new Promise<GenResponse<boolean>>((resolve) => {
      const resp = GenResponse.Result(false, '', StatusCode.NotImplemented);
      if (deleteResult && deleteResult.id) {
        resp.isSuccess = resp.data = true;
        resp.message = 'Task deleted successfully';
        resp.statusCode = StatusCode.OK;
        resolve(resp);
      } else {
        resp.message = 'Task deletion failed';
        resolve(resp);
      }
    });
    return objResp;
  }
}
