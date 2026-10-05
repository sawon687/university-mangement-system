export interface ISemester {
	name: 'FALL'|'SUMMER'|'SPRING';
	year: number;
    id?:string
	startDate: string;
	endDate: string;
	registrationOpen?:boolean
}

export interface IUpdateSemester {
	startDate: string;
	endDate: string;
	registrationOpen: boolean;
}