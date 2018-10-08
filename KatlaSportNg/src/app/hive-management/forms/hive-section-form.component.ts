import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveSection } from '../models/hive-section';
import { HiveSectionService } from '../services/hive-section.service';

@Component({
  selector: 'app-hive-section-form',
  templateUrl: './hive-section-form.component.html',
  styleUrls: ['./hive-section-form.component.css']
})
export class HiveSectionFormComponent implements OnInit {

  hiveSection = new HiveSection(0,"","",0,false,"");
  hiveId: number;
  isNewSection = false; 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HiveSectionService
  ) { } 

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.hiveId = p.hiveId;
      if(p.id === undefined) 
        this.isNewSection = true
      else
      {
        this.service.getHiveSection(p.id).subscribe(h => this.hiveSection = h);
      }
      // Needs here anyway, because Update or Add methods requires hive store id in request
      this.hiveSection.storeHiveId = this.hiveId;
    })
  }

  navigateToHiveSections(){
    this.router.navigate([`/hive/${this.hiveId}/sections`]);
  }

  onCancel(){
    this.navigateToHiveSections();
  }

  onSubmit(){
    this.isNewSection ? this.service.addHiveSection(this.hiveSection).subscribe(s => this.navigateToHiveSections()):
      this.service.updateHiveSection(this.hiveSection).subscribe(s => this.navigateToHiveSections());
  }

  onDelete() {
    this.setStatus(true);
  }
  onUndelete() {
    this.setStatus(false);
  }

  onPurge(){
    this.service.deleteHiveSection(this.hiveSection.id).subscribe(s => this.navigateToHiveSections());
  }

  private setStatus(status: boolean){
    this.service.setHiveSectionStatus(this.hiveSection.id, status).subscribe(h => this.hiveSection.isDeleted = status);
  }
}
