import { Controller } from '@nestjs/common';
import { ControllerPrefix } from 'src/constants/controller-prefix.constant';

@Controller(`${ControllerPrefix.ADMIN}/todos`)
export class TodosControllerAdmin {}
