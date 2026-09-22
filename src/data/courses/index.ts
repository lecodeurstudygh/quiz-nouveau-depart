import { week01 } from "./week-01";
import { week10 } from "./week-10";
import { CourseWeek } from "@/types/course";

export const allCourses: CourseWeek[] = [week01, week10];

export function getCourseByWeek(weekNumber: number): CourseWeek | undefined {
  return allCourses.find((c) => c.weekNumber === weekNumber);
}

export function getCourseById(id: string): CourseWeek | undefined {
  return allCourses.find((c) => c.id === id);
}

export function getAllVerses() {
  return allCourses.flatMap((course) => course.verses);
}

export function getAllQuestions() {
  return allCourses.flatMap((course) => course.questions);
}

export function getAllDiscussionCards() {
  return allCourses.flatMap((course) => course.discussionCards || []);
}

export { week01, week10 };

