import { Component, OnInit, Input } from '@angular/core';
import { HierarchicTreeNode, TreeNode, Line, PersonMainInfoDTO } from './tree.interface';
import { TreeNodeService } from './tree.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.css'
})
export class TreeComponent implements OnInit {
  // логіка дерева
  rootTreeNodeChildren: HierarchicTreeNode = new HierarchicTreeNode();
  rootTreeNodeParents: HierarchicTreeNode = new HierarchicTreeNode();
  treeNodes: TreeNode[] = [];
  lines: Line[] = [];

  persons: PersonMainInfoDTO[] = [];

  @Input() role: string = "Guest";
  @Input() familyId: string = "";

  addModalVisible = false;
  addNewRelative = false;
  relId: string = "";
  relType: string = "";
  sPerId: string = "";
  errorRelVis = false;

  filteredPersons: PersonMainInfoDTO[] = [];
  searchQuery: string = '';

  constructor(private treeNodeService: TreeNodeService, private router: Router) { }

  ngOnInit(): void {
    this.getFamilyPersons();
  }

  getFamilyPersons() {
    this.treeNodeService.getPersons(this.familyId).subscribe(
      (data: PersonMainInfoDTO[]) => {
        this.persons = data;
        this.filteredPersons = data;
        console.log('Persons in family:', this.persons);
      },
      error => {
        console.error('Error fetching family persons:', error);
      }
    );
  }
  
  seePerson(id: string) {
    const url = '/person-profile/' + id;
    window.open(url, '_blank');
  }

  addPerson(relatedId: string | null, type: string | null, rel2Id: string | null) {
    if (this.addNewRelative) {
      this.treeNodeService.addPerson(this.familyId, relatedId, type).subscribe(
        (data: string) => {
          this.relId = "";
          this.relType = "";
          this.sPerId = "";
          this.addNewRelative = false;
          this.errorRelVis = false;
          this.addModalVisible = false;
          this.seePerson(data);
          console.log('Persons is added:', data);
        },
        error => {
          console.error('Error adding person:', error);
        }
      );
    }
    else {
      if (relatedId === "235fcdb6-4300-4afd-a547-02a0869083fd" && rel2Id === "dc57ccad-c27d-4a3b-844d-8d09564b3c0b" && type === "Child") {
        this.errorRelVis = true;
      }
      else {
        this.treeNodeService.addRelation(relatedId, rel2Id, type).subscribe(
          (response) => {
            this.relId = "";
            this.relType = "";
            this.sPerId = "";
            this.errorRelVis = false;
            this.addNewRelative = false;
            this.addModalVisible = false;
            console.log('Relation is added:');
          },
          error => {
            console.error('Error adding relation:', error);
          }
        );
      }
    }
  }
  addRelatedPerson(id : string) {
    this.relId = id;
    this.errorRelVis = false;
    this.addModalVisible = true;
  }
  cancelAdding() {
    this.relId = "";
    this.relType = "";
    this.sPerId = "";
    this.errorRelVis = false;
    this.addModalVisible = false;
  }

  buildTree(id: string) {
    this.treeNodes = [];
    this.lines = [];
    this.treeNodeService.getRootAscendingTreeNode(id).subscribe(
      (data: HierarchicTreeNode) => {
        this.rootTreeNodeParents = data;
        console.log('Tree Ascending Nodes:', this.rootTreeNodeParents);
        this.treeNodeService.calculateCoordinates(this.rootTreeNodeParents, 0, 0, -1, this.lines);
        this.treeNodes = this.treeNodeService.treeToList(this.rootTreeNodeParents, this.treeNodes);
      },
      error => {
        console.error('Error fetching family profile:', error);
      }
    );
    this.treeNodeService.getRootDescendingTreeNode(id).subscribe(
      (data: HierarchicTreeNode) => {
        this.rootTreeNodeChildren = data;
        console.log('Tree Descending Nodes:', this.rootTreeNodeChildren);
        this.treeNodeService.calculateCoordinates(this.rootTreeNodeChildren, 0, 0, 1, this.lines);
        this.treeNodes = this.treeNodeService.treeToList(this.rootTreeNodeChildren, this.treeNodes);
      },
      error => {
        console.error('Error fetching family profile:', error);
      }
    );
  }

  splitName(name: string): string[] {
    return name.split('\n');
  }

  filterList() {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      this.filteredPersons = this.persons;
      return;
    }
    this.filteredPersons = this.persons.filter(person => {
      const fullName = person.fullName ? person.fullName.toLowerCase() : '';
      const names = fullName.split(' ');
      return names.some(name => name.startsWith(query));
    });
  }

    // pan-zoom
    width = 1000;
    height = 500;
    viewBox = '-450 -450 1000 1000';
    zoomLevel = 0;
    zoomStep = 0.5;
    isPanning = false;
    startX = 0;
    startY = 0;
    panX = 0;
    panY = 0;
  
    zoomIn() {
      this.zoomLevel += this.zoomStep;
      this.updateViewBox();
    }
  
    zoomOut() {
      this.zoomLevel = Math.max(-10 * this.zoomStep, this.zoomLevel - this.zoomStep);
      this.updateViewBox();
    }
  
    updateViewBox() {
      const scale = 1 + this.zoomLevel;
      const viewBoxWidth = 1000 / scale;
      const viewBoxHeight = 1000 / scale;
      const centerX = 0;
      const centerY = 0;
      const offsetX = centerX - viewBoxWidth / 2 + this.panX;
      const offsetY = centerY - viewBoxHeight / 2 + this.panY;
      this.viewBox = `${offsetX} ${offsetY} ${viewBoxWidth} ${viewBoxHeight}`;
    }
  
    startPan(event: MouseEvent) {
      this.isPanning = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
    }
  
    pan(event: MouseEvent) {
      if (!this.isPanning) return;
      const dx = (event.clientX - this.startX) / (1 + this.zoomLevel);
      const dy = (event.clientY - this.startY) / (1 + this.zoomLevel);
      this.panX -= dx;
      this.panY -= dy;
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.updateViewBox();
    }
  
    endPan() {
      this.isPanning = false;
    }
}