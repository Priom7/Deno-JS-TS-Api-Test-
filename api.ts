import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

// Model

interface Courses {
	name: string;
	price: number;
	enrolled: number;
	isOpen: boolean;
}

// Data

let courses: Array<Courses> = [
	{
		name: 'React js',
		price: 5,
		enrolled: 1000,
		isOpen: true
	},
	{
		name: 'Node js',
		price: 5,
		enrolled: 1000,
		isOpen: true
	},
	{
		name: 'MongoDB',
		price: 5,
		enrolled: 1000,
		isOpen: true
	}
];

// Controllers

export const getCourses = ({ response }: { response: any }) => {
	response.body = courses;
};

export const addCourses = async ({ request, response }: { request: any; response: any }) => {
	const body = await request.body();
	const course: Courses = body.value;

	courses.push(course);

	response.body = { coursesAdded: 'Success' };
	response.status = 200;
};

//server file

const router = new Router();
const app = new Application();
const Port = 4300;

router.get('/get', getCourses).post('/create', addCourses);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 4300 });
