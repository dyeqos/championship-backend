import { Parameter } from '../entities/parameter.entity';
import { ParameterResponse } from '../interfaces/parameter-response.interface';

export class ParameterMapper {
  static paramToResponse(parameter: Parameter): ParameterResponse {
    return {
      description: parameter.description,
      domain: parameter.domain,
      id: parameter._id as string,
      name: parameter.name,
      isActive: parameter.isActive ?? false,
    };
  }

  static paramListToResponse(parameters: Parameter[]): ParameterResponse[] {
    return parameters.map((parameter) => this.paramToResponse(parameter));
  }
}
