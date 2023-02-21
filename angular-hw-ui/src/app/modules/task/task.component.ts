import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { Task } from 'src/app/models/task';
import { SelectParams, colors } from 'src/app/models/paramArrays';
import { TasksService } from 'src/app/core/services/board-service/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  logOut: boolean = true;
  
  private routeSub!: Subscription;
  public taskId: string = '';

  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;

  public title = 'comment';
  tasks: Task[] = [];
  task: any;
  comments: string[] = [];
  colors: string[] = colors;
  private colorNumber: number = 0;
  public currentCommentColor: string = 'red-violet-crayola';

  oldComment: string = '';
  selectedParams: SelectParams = { name: '', sort: 'Date', order: 'ASC' };

  createNewComment: boolean = false;
  addCommentForm?: FormGroup;

  editCurrentComment: boolean = false;
  editCommentForm?: FormGroup;

  deleteCurrentComment: boolean = false;

  name: string = '';
  sort: string = 'Date';
  order: string = 'ASC';
  currentOrder: string = 'ASC';

  private readonly destroy$ = new Subject<void>();

  constructor(
    private tasksService: TasksService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.routeSub = this.route.params.subscribe(params => {
      this.taskId = params['id'];
    });
  }

  ngOnInit(): void {
    this.refreshComments();

    this.addCommentForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    });

    this.editCommentForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeColor(colorNumber: number) {
    this.colorNumber = colorNumber;
  }

  getColorValue(): any {
    this.currentCommentColor = colors[this.colorNumber];
    return this.currentCommentColor;
  }

  onSubmit(): void {
    let commentsInfo: string[] = ['new comment', this.addCommentForm?.value.name];
    let newTask: Partial<Task> = { comments: commentsInfo };

    this.tasksService.editTask(this.taskId, newTask)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => this.refreshComments(),
        error: () => alert('The comment wasn`t created. Please try again')
      });

    this.addCommentForm?.reset();
    this.createNewComment = false;
  }

  addNewComment(): void {
    this.createNewComment = true;
  }

  onEdit(): void {
    let commentsInfo: string[] = ['comment to change', this.oldComment, this.editCommentForm?.value.name];
    let newTask: Partial<Task> = { comments: commentsInfo };

    this.tasksService.editTask(this.taskId, newTask)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => this.refreshComments(),
        error: () => alert('The comment wasn`t changed. Please try again')
      });

    this.editCommentForm?.reset();
    this.editCurrentComment = false;
  }

  editComment(comment: string): void {
    this.editCurrentComment = true;
    this.oldComment = comment;
  }

  deleteComment(comment: string): void {
    let commentsInfo: string[] = ['comment to delete', comment];
    let newTask: Partial<Task> = { comments: commentsInfo };

    this.tasksService.editTask(this.taskId, newTask)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => this.refreshComments(),
        error: () => alert('The comment wasn`t deleted. Please try again')
      });
  }

  changeSortingParams(selectedParams: SelectParams) {
    this.selectedParams = selectedParams;
  }

  private refreshComments() {
    this.tasksService.getTaskById(this.selectedParams, this.taskId)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((result) => {
        this.comments = result.task.comments;
      });
  }
}
