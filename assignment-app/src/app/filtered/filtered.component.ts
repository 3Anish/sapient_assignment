import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  ActivatedRoute,
  Router,
  RouterEvent,
  NavigationEnd,
  Data,
} from '@angular/router';
import { map, shareReplay, filter, takeUntil } from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './filtered.component.html',
  styleUrls: ['./filtered.component.css'],
})
export class FilteredComponent implements OnInit, OnDestroy {
  allData: any = [];
  navigationSubscription: any;
  message: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: DataService
  ) {}
  state$: Observable<object>;
  public destroyed = new Subject<any>();

  ngOnInit(): void {
    this.fetchData();

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.fetchData();
      }
    });
  }

  fetchData() {
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    this.state$.subscribe({
      next: (obj) => {
        this.allData = obj;
        this.allData = this.allData.data;
        if (this.allData === undefined) {
          this.router.navigateByUrl('/');
        }
        if (this.allData.length === 0) {
          this.message = 'No Records Found !';
        }
      },
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }
}
