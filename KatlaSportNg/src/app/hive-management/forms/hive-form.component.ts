import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveService } from '../services/hive.service';
import { Hive } from '../models/hive';

@Component({
  selector: 'app-hive-form',
  templateUrl: './hive-form.component.html',
  styleUrls: ['./hive-form.component.css']
})

export class HiveFormComponent implements OnInit {
  hive = new Hive(0, "", "", "", false, "");
  existed = false;
  hasConflict = false;
  conflictDelayMs = 300;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveService: HiveService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p['id'] === undefined) return;
      this.hiveService.getHive(p['id']).subscribe(h => this.hive = h);
      this.existed = true;
    });
  }

  navigateToHives() {
    this.router.navigate(['/hives']);
  }

  onCancel() {
    this.navigateToHives();
  }
  
  onSubmit() {
    this.existed ? this.hiveService.updateHive(this.hive).subscribe(
      ok => this.navigateToHives(),
      error => this.setConflictExistion()
    ):
    this.hiveService.addHive(this.hive).subscribe(
      ok => this.navigateToHives(),
      error => this.setConflictExistion()
    )
  }

  onDelete() {
    this.hiveService.setHiveStatus(this.hive.id, true).subscribe(s => this.hive.isDeleted = true);
  }

  onUndelete() {
    this.hiveService.setHiveStatus(this.hive.id, false).subscribe(s => this.hive.isDeleted = false);
  }

  onPurge() {
    this.hiveService.deleteHive(this.hive.id).subscribe(s => this.navigateToHives());
  }

  private setConflictExistion(){
    this.hasConflict = false;
    // Delay here for user, just to detect for eye error's occurring
    window.setTimeout( ()=> { this.hasConflict = true }, this.conflictDelayMs);
  }
}
