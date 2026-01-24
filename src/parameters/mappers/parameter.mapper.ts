import { Parameter } from '../entities/parameter.entity';
import { ParameterResponse } from '../interfaces/parameter-response.interface';

export class ParameterMapper {
  static paramToResponse(parameter: Parameter): ParameterResponse {
    if (!parameter) return parameter;
    return {
      description: parameter.description,
      domain: parameter.domain,
      id: parameter._id as string,
      name: parameter.name,
      isActive: parameter.isActive ?? false,
    };
  }

  static paramListToResponse(parameters: Parameter[]): ParameterResponse[] {
    if (parameters.length === 0) return [];
    return parameters.map((parameter) => this.paramToResponse(parameter));
  }
}
