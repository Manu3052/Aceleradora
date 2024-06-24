export enum ValidationMessageEnum {
  EMPTY_INPUT = 'É necessário preecher todos os campos.',
  ALREADY_EXISTS_TELEPHONE = 'Paciente já cadastrado!',
  SIGN_IN_SUCESS = 'Paciente cadastrado com sucesso',
  ALREADY_CHOSEN_DATA = 'Já existe um agendamento nesse horário. Por favor, escolha outra data ou horário.',
  DATE_OUT_LIMIT = 'Não é possível marcar uma data anterior ao dia atual.',
  NOT_FOUND = 'Não foram encontrados pacientes cadastrados.',
  NOT_FOUND_PATIENT = 'Esse paciente não foi encontrado.',
}
