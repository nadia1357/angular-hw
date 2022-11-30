import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/task';
import { sortParams, orderParams, selectParams, colors } from 'src/app/models/paramArrays';
import { CommentsService } from 'src/app/core/services/task-service/comments.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  public taskId: string | undefined;

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
  searchedCommentName: string = '';
  selectedParams: selectParams = { name: '', sort: 'Date', order: 'ASC' };

  createNewComment: boolean = false;
  addCommentForm?: FormGroup;

  editCurrentComment: boolean = false;
  editCommentForm?: FormGroup;

  deleteCurrentComment: boolean = false;

  name: string = '';
  sort: string = 'Date';
  order: string = 'ASC';
  currentOrder: string = 'ASC';

  tasksKey: string = 'tasks';

  constructor(
    private CommentsService: CommentsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.routeSub = this.route.params.subscribe(params => {
      this.taskId = params['id'];
    });
  }

  ngOnInit(): void {
    let allTasks: any = localStorage.getItem(this.tasksKey);
    if (allTasks) {
      this.tasks = JSON.parse(allTasks);
    } else this.tasks = [];
    this.task = this.tasks.find((item: any) => item.id === this.taskId);
    this.comments = this.task.comments;

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

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  changeColor(colorNumber: number) {
    this.colorNumber = colorNumber;
  }

  getColorValue(): any {
    this.currentCommentColor = colors[this.colorNumber];
    return this.currentCommentColor;
  }

  onSubmit(): void {
    let newComment: string = this.addCommentForm?.value.name;
    this.CommentsService.addNewComment(this.tasksKey, newComment, this.taskId);

    let allTasks: any = localStorage.getItem(this.tasksKey);
    if (allTasks) {
      this.tasks = JSON.parse(allTasks);
      this.task = this.tasks.find((item: any) => item.id === this.taskId);
      this.comments = this.task.comments;
    } else {
      this.tasks = [];
      this.comments = [];
    }

    this.addCommentForm?.reset();
    this.createNewComment = false;
  }

  addNewComment(): void {
    this.createNewComment = true;
  }

  onEdit(): void {
    let newComment = this.editCommentForm?.value.name;
    this.CommentsService.editComment(this.tasksKey, this.oldComment, newComment, this.taskId);

    let allTasks: any = localStorage.getItem(this.tasksKey);
    if (allTasks) {
      this.tasks = JSON.parse(allTasks);
      this.task = this.tasks.find((item: any) => item.id === this.taskId);
      this.comments = this.task.comments;
    } else {
      this.tasks = [];
      this.comments = [];
    }

    this.editCommentForm?.reset();
    this.editCurrentComment = false;
  }

  editComment(comment: string): void {
    this.editCurrentComment = true;
    this.oldComment = comment;
  }

  deleteComment(comment: string): void {
    this.CommentsService.deleteComment(this.tasksKey, comment, this.taskId);

    let allTasks: any = localStorage.getItem(this.tasksKey);
    if (allTasks) {
      this.tasks = JSON.parse(allTasks);
      this.task = this.tasks.find((item: any) => item.id === this.taskId);
      this.comments = this.task.comments;
    } else {
      this.tasks = [];
      this.comments = [];
    }
  }

  changeSortingParams(selectedParams: selectParams) {
    this.searchedCommentName = selectedParams.name;

    this.sort = selectedParams.sort;
    switch (this.sort) {
      case sortParams[0]:
        this.comments.sort((a: any, b: any) => {
          let nameA = a.toLowerCase();
          let nameB = b.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        })
        break;
      case sortParams[1]:
        this.comments.sort((a: any, b: any) => +a.date - +b.date);
        break;
      case sortParams[2]:
        this.comments.sort((a: any, b: any) => a.numberOfTasks - b.numberOfTasks);
        break;
    }

    this.order = selectedParams.order;
    if (this.order === orderParams[1] && this.currentOrder === 'ASC') {
      this.comments.reverse();
      this.currentOrder = 'DESC';
    } else if (this.order === orderParams[0] && this.currentOrder === 'DESC') {
      this.comments.reverse();
      this.currentOrder = 'ASC';
    } else if (this.order === orderParams[1] && this.currentOrder === 'DESC') {
      this.currentOrder = 'DESC';
    }
    else if (this.order === orderParams[0] && this.currentOrder === 'ASC') {
      this.currentOrder = 'ASC';
    }
  }
}
