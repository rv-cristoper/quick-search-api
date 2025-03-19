import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumberString,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum DocumentType {
  DNI = 'dni',
  RUC = 'ruc',
}

@ValidatorConstraint({ name: 'IsValidDocumentNumberConstraint', async: false })
export class IsValidDocumentNumberConstraint
  implements ValidatorConstraintInterface
{
  validate(documentNumber: string, args: ValidationArguments) {
    const { documentType } = args.object as SearchDto;

    const validations = {
      [DocumentType.DNI]: documentNumber.length !== 8,
      [DocumentType.RUC]: documentNumber.length !== 11,
    };

    return !validations[documentType];
  }

  defaultMessage(args: ValidationArguments) {
    const { documentType } = args.object as SearchDto;

    const errorMessage = {
      [DocumentType.DNI]: 'El número de DNI debe tener exactamente 8 dígitos',
      [DocumentType.RUC]: 'El número de RUC debe tener exactamente 11 dígitos',
    };

    return errorMessage[documentType];
  }
}

export class SearchDto {
  @ApiProperty({
    enum: DocumentType,
    description: 'Tipo de documento a consultar (dni o ruc)',
    example: 'dni',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'El tipo de documento es requerido' })
  @IsEnum(DocumentType, {
    message: 'El tipo de documento debe ser "dni" o "ruc"',
  })
  documentType: DocumentType;

  @ApiProperty({
    description: 'Número de documento (solo dígitos)',
    examples: {
      DNI: { value: '12345678' },
      RUC: { value: '20123456789' },
    },
  })
  @IsNotEmpty({ message: 'El número de documento es requerido' })
  @IsNumberString(
    {},
    {
      message: 'El número de documento debe contener solo dígitos',
    },
  )
  @Validate(IsValidDocumentNumberConstraint)
  documentNumber: string;
}
