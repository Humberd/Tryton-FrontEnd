export function Controller(ctrlDef: ControllerDefinition) {
	return function (constructorFunction) {
		angular.module(ctrlDef.module)
			.controller(ctrlDef.name, constructorFunction);
	}
}
export interface ControllerDefinition {
	module: string;
	name: string;
}