import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, interval, switchMap, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  currentTime: string = '';
  destroy$ = new Subject<void>();

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.pollServer();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  pollServer() {
    interval(environment.pollingIntervalInSeconds * 1000) // 1000 ms = 1 second
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() =>
          this.httpClient.get(
            environment.serverUrl + environment.timestampEndpooint,
            {
              responseType: 'text',
            }
          )
        )
      )
      .subscribe({
        next: (t) => {
          console.log(JSON.stringify(t));
          this.currentTime = t;
        },
      });
  }
}
