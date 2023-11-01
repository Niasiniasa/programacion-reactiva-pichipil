import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/dashboard/pages/users/models';
import { TextConstants } from 'src/core/constants/text.constants';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(value: User, ...args: unknown[]): unknown {
    
    const firstArg = args [0];
    const result = `${value.name} ${value.lastname}`;

    switch (firstArg){
      case TextConstants.TO_LOWERCASE:
        return result.toLowerCase();
      
      case TextConstants.TO_UPPERCASE:
        return result.toUpperCase();
        
        default:
          return 'Invalid args';
    }
    

    return  ;
  }

}
