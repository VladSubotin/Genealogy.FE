import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HierarchicTreeNode, TreeNode, Line, PersonOptionsDTO, PersonMainInfoDTO, PersonToCreateDTO, RelationToCreateDTO } from './tree.interface';

@Injectable({
  providedIn: 'root'
})
export class TreeNodeService {

  url = "https://localhost:7161";
  public token = "";
  
  constructor(private http: HttpClient) {  
    this.token = localStorage.getItem('auth-token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJ1c2VyMiIsIm5iZiI6MTcxNzQ5NjY4MSwiZXhwIjoxNzE3NzEyNjgxLCJpYXQiOjE3MTc0OTY2ODEsImlzcyI6IjFkTEhkSWZTSzI3Skg2ZHNCRDNqaDhyZk0weSIsImF1ZCI6InNBeThzU2JGMmplMjBGRFMzcjRrQW03UXJhTmwwIn0.l6tO7ZyXWQiYXNFi7F-R8zKG-EwsbactrocNkuV9Rug';
  }

  public getRootDescendingTreeNode(id: string): Observable<HierarchicTreeNode> {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<HierarchicTreeNode>(`${this.url}/getDescendingTree?id=` + id, { headers });
  }
  public getRootAscendingTreeNode(id: string): Observable<HierarchicTreeNode> {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<HierarchicTreeNode>(`${this.url}/getAscendingTree?id=` + id, { headers });
  }

  public getPersons(familyId: string): Observable<PersonMainInfoDTO[]> {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const req  = new PersonOptionsDTO();
    req.facts = null;
    req.familyId = familyId;
    req.firstName = null;
    req.gender = null;
    req.lastName = null;
    req.middleName = null;
    req.prefix = null;
    req.relatives = null;
    req.suffix = null;
    return this.http.post<PersonMainInfoDTO[]>(`${this.url}/getPersons`, req, { headers });
  }

  public addPerson(familyId: string, relatedId: string | null, type: string | null): Observable<string> {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const req  = new PersonToCreateDTO();
    req.familyId = familyId;
    req.relationType = type;
    req.toPersonId = relatedId;
    return this.http.post<string>(`${this.url}/addPerson`, req, { headers });
  }

  public addRelation(relatedId1: string | null, relatedId2: string | null, type: string | null) {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const req  = new RelationToCreateDTO();
    req.personIsId = relatedId1;
    req.relationType = type;
    req.toPersonId = relatedId2;
    return this.http.post(`${this.url}/addPersonRelation`, req, { headers });
  }

  nodeWidth: number = 50;
  nodeHeight: number = 50;

  calculateCoordinates(treeNode: HierarchicTreeNode, x: number, y: number, direction: number, lines: Line[]) {
    treeNode.x = x;
    treeNode.y = y;

    if (treeNode.subNodes) {
        const childCount = treeNode.subNodes.length;
        let totalWidth = 0;
        totalWidth = this.getSubtreeWidth(treeNode); // Отримуємо ширину піддерева цього вузла
        const startX = x - totalWidth / 2; // Стартова позиція для дочірніх вузлів - лівий край піддерева

        let currentX = startX; 
        treeNode.subNodes.forEach(child => {
            const childWidth = this.getSubtreeWidth(child); // Отримуємо ширину піддерева для дочірнього вузла
            const childX = currentX + childWidth / 2; // Зсуваємо дочірній вузол до центру його піддерева
            const childY = y + this.nodeHeight * 1.5 * direction; // Встановлюємо висоту для дочірніх вузлів
            this.calculateCoordinates(child, childX, childY, direction, lines); // Обхід графа в глибину

            lines.push({
              startX: x + this.nodeWidth / 2,
              startY: y + (this.nodeHeight / 2 + this.nodeHeight / 2 * direction), // Нижній\Верхній центр батьківського вузла
              endX: childX + this.nodeWidth / 2,
              endY: childY + 50 + (-this.nodeHeight / 2 - this.nodeHeight / 2 * direction) // Верхній\Нижній центр дочірнього вузла
            });

            currentX += childWidth; // Для наступного дочірнього вузла встановлюємо стартову позицію на правому краю піддерева цього вузла
        });
    }
  }

  getSubtreeWidth(treeNode: HierarchicTreeNode): number {
    // Ширина одного вузла + відступи по боках
      if (!treeNode.subNodes || treeNode.subNodes.length === 0) {
          return 100; 
      }
      // Обхід графа в глибину
      let totalWidth = 0;
      treeNode.subNodes.forEach(child => {
          totalWidth += this.getSubtreeWidth(child);
      });
      return totalWidth;
  }


  treeToList(treeNode: HierarchicTreeNode, resultList: TreeNode[] = []): TreeNode[] {
    // Добавляем текущий узел в список результатов
    resultList.push({
      id: treeNode.id,
      name: treeNode.name,
      x: treeNode.x,
      y: treeNode.y
    });
  
    // Рекурсивно вызываем функцию для каждого дочернего узла
    if (treeNode.subNodes) {
      treeNode.subNodes.forEach(child => {
        this.treeToList(child, resultList);
      });
    }
    return resultList;
  }
}
