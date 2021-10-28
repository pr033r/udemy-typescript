interface Admin {
  id: number;
  login: string;
} // same as: type Admin = {...}

interface RegularEmployee {
  privileges: string[];
  startDate: Date;
} // same as: type RegularEmployee = {...}

type ElevatedEmployee = RegularEmployee & Admin;
// interface ElevatedEmployee extends Admin, RegularEmployee {}
type UnknownEmployee = RegularEmployee | Admin;

function printEmployee(employee: UnknownEmployee) {
  // Type Guards
  if ('id' in employee) {
    console.log(`[${employee.id}] ${employee.login}`);
  }
  if ('privileges' in employee) {
    console.log(
      `-> privileges: ${employee.privileges} \n\t Start Date: ${employee.startDate}`
    );
  }
}

printEmployee({
  id: 270,
  login: 'lasakada',
});

printEmployee({
  privileges: ['admin', 'sys_admin', 'programmer'],
  startDate: new Date(),
});
