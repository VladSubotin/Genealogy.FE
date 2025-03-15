import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyUsersDTO, FamilyMemberToAddDTO } from '../members/members.interface'
import { MemberService } from '../members/members.service'
import { TaskDTO, TaskOptionsDTO, TaskToCreateDTO, TaskToUpdateDTO, StepDTO, StepToAddDTO, StepToUpdateDTO } from './tasks.interface';
import { TaskService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input() role: string = "Guest";
  @Input() familyId: string = "";

  tasks: TaskDTO[] = [];
  taskOptions: TaskOptionsDTO = new TaskOptionsDTO();
  
  newTask: TaskToCreateDTO = new TaskToCreateDTO();
  addModalVisible = false;

  curTask: TaskToUpdateDTO = new TaskToUpdateDTO();
  updateModalVisible = false;

  newStep: StepToAddDTO = new StepToAddDTO();
  addSModalVisible = false;

  curStep: StepToUpdateDTO = new StepToUpdateDTO();
  updateSModalVisible = false;
  
  members: FamilyUsersDTO[] = [];

  constructor(private memberService: MemberService, private router: Router, private taskService: TaskService) { }

  ngOnInit(): void {
    this.getMembers();
    this.getTasks();
  }

  todo(index: number): boolean {
    return !this.tasks[index]?.isDone ?? false
  }

  getMembers() {
    this.memberService.getMembers(this.familyId).subscribe(
      (data: FamilyUsersDTO[]) => {
        this.members = data;
        console.log('Members:', this.members);
      },
      error => {
        console.error('Error fetching members:', error);
      }
    );
  }

  getTasks() {
    this.taskOptions.familyId = this.familyId;
    this.taskService.getTasks(this.taskOptions).subscribe(
      (data: TaskDTO[]) => {
        this.tasks = data;
        this.sortSteps();
        console.log('Tasks:', this.tasks);
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  free() {
    this.taskOptions = new TaskOptionsDTO();
  }

  sortSteps() {
    this.tasks.forEach(task => {
      task.steps.sort((a, b) => (a?.stepNum ?? 0) - (b?.stepNum ?? 0));
    });
  }

  addTask() {
    this.newTask.familyId = this.familyId;
    this.taskService.addTask(this.newTask).subscribe( (response) => 
      {
        console.log('Task is added');
        this.newTask = new TaskToCreateDTO();
        this.addModalVisible = false;
        this.getTasks();
      },
      error => {
        console.error('Error adding task:', error);
      }
    );
  }
  addTaskStart() {
    this.addModalVisible = true;
  }
  cancelAdding() {
    this.newTask = new TaskToCreateDTO();
    this.addModalVisible = false;
  }

  updateTask() {
    this.taskService.updateTask(this.curTask).subscribe( (response) => 
      {
        console.log('Task is updated');
        this.curTask = new TaskToUpdateDTO();
        this.updateModalVisible = false;
        this.getTasks();
      },
      error => {
        console.error('Error updating task:', error);
      }
    );
  }
  updateTaskStart(index: number) {
    this.curTask.id = this.tasks[index].id;
    this.curTask.name = this.tasks[index].name;
    this.curTask.description = this.tasks[index].description;
    this.curTask.isDone = this.tasks[index].isDone;
    this.curTask.userLogin = this.tasks[index].userLogin;
    this.updateModalVisible = true;
  }
  cancelUpdating() {
    this.curTask = new TaskToUpdateDTO();
    this.updateModalVisible = false;
  }

  deleteTask(id: string | null | undefined) {
    if (confirm('Точно хочете видалити цю задачу?') && id !== null && id !== undefined) {
      this.taskService.removeTask(id)
      .subscribe(  (response) => {
        console.log("задачу видалено:", response);
        this.getTasks();
      },
      (error) => {
        console.error("Помилка видалення задачи:", error);
      }
    );
    }
  }




  addStep() {
    this.taskService.addStep(this.newStep).subscribe( (response) => 
      {
        console.log('Step is added');
        this.newStep = new StepToAddDTO();
        this.addSModalVisible = false;
        this.getTasks();
      },
      error => {
        console.error('Error adding step:', error);
      }
    );
  }
  addStepStart(id: string) {
    this.newStep.taskId = id;
    this.addSModalVisible = true;
  }
  cancelSAdding() {
    this.newStep = new StepToAddDTO();
    this.addSModalVisible = false;
  }

  updateStep() {
    this.taskService.updateStep(this.curStep).subscribe( (response) => 
      {
        console.log('Step is updated');
        this.curStep = new StepToUpdateDTO();
        this.updateSModalVisible = false;
        this.getTasks();
      },
      error => {
        console.error('Error updating step:', error);
      }
    );
  }
  updateStepStart(tIndex: number, sIndex: number) {
    this.curStep.id = this.tasks[tIndex].steps[sIndex].id;
    this.curStep.isDone = this.tasks[tIndex].steps[sIndex].isDone;
    this.curStep.purpose = this.tasks[tIndex].steps[sIndex].purpose;
    this.curStep.result = this.tasks[tIndex].steps[sIndex].result;
    this.curStep.source = this.tasks[tIndex].steps[sIndex].source;
    this.curStep.sourceLocation = this.tasks[tIndex].steps[sIndex].sourceLocation;
    this.curStep.term = this.tasks[tIndex].steps[sIndex].term;
    this.updateSModalVisible = true;
  }
  cancelSUpdating() {
    this.curStep = new StepToUpdateDTO();
    this.updateSModalVisible = false;
  }

  deleteStep(id: string | null | undefined) {
    if (confirm('Точно хочете видалити цей крок?') && id !== null && id !== undefined) {
      this.taskService.removeStep(id)
      .subscribe(  (response) => {
        console.log("Крок видалено:", response);
        this.getTasks();
      },
      (error) => {
        console.error("Помилка видалення кроку:", error);
      }
    );
    }
  }
}
