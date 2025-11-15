import { PipeTransform, Injectable } from "@nestjs/common";

@Injectable()
export class CaseInsensitiveQueryPipe implements PipeTransform {
  transform(value: Record<string, unknown> | undefined) {
    if (!value || typeof value !== "object") return value;

    const normalized: Record<string, unknown> = {};
    for (const key of Object.keys(value)) {
      normalized[key.toLowerCase()] = value[key];
    }
    return normalized;
  }
}
