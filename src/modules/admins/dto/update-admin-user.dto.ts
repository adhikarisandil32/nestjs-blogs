import {
  UpdateUserDto,
  UpdateUserPasswordDto,
} from 'src/modules/users/dto/update-user.dto';

export class UpdateAdminDto extends UpdateUserDto {}

export class UpdateAdminPasswordDto extends UpdateUserPasswordDto {}
