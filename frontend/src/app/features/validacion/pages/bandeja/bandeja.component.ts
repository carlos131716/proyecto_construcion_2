import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ValidacionService, Sistema, Estado } from '../../services/validacion.service';

@Component({
  selector: 'app-bandeja',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './bandeja.component.html',
  styleUrls: ['./bandeja.component.css'],
})
export class BandejaComponent {

  items: Sistema[] = [];
  filtered: Sistema[] = [];

  search = '';
  estadoFilter: '' | Estado | 'ALL' = '';

  page = 1;
  pageSize = 5;

  sortField: keyof Sistema | '' = '';
  sortDir: 1 | -1 = 1;

  estados = ['ENVIADO', 'APROBADO', 'OBSERVADO', 'RECHAZADO'] as Estado[];

  constructor(
    private svc: ValidacionService,
    private router: Router
  ) {
    this.items = this.svc.getAll();
    this.filtered = [...this.items];
  }

  get totalSistemas(): number {
    return this.items.length;
  }

  get enviados(): number {
    return this.items.filter(x => x.estado === 'ENVIADO').length;
  }

  get aprobados(): number {
    return this.items.filter(x => x.estado === 'APROBADO').length;
  }

  get observados(): number {
    return this.items.filter(x => x.estado === 'OBSERVADO').length;
  }

  get rechazados(): number {
    return this.items.filter(x => x.estado === 'RECHAZADO').length;
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterEstado(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.estadoFilter = (target.value as any) || '';
    this.applyFilters();
  }

  applyFilters() {
    const s = this.search.trim().toLowerCase();

    this.filtered = this.items.filter((it) => {

      const matchesSearch =
        !s ||
        it.nombre.toLowerCase().includes(s) ||
        it.codigo.toLowerCase().includes(s) ||
        it.area.toLowerCase().includes(s) ||
        (it.responsable || '').toLowerCase().includes(s);

      const matchesEstado =
        !this.estadoFilter ||
        this.estadoFilter === 'ALL' ||
        it.estado === this.estadoFilter;

      return matchesSearch && matchesEstado;
    });

    this.applySort();
    this.page = 1;
  }

  applySort() {
    if (!this.sortField) return;

    this.filtered.sort((a, b) => {

      const va = (a as any)[this.sortField];
      const vb = (b as any)[this.sortField];

      if (va < vb) return -1 * this.sortDir;
      if (va > vb) return 1 * this.sortDir;

      return 0;
    });
  }

  setSort(field: keyof Sistema) {

    if (this.sortField === field) {
      this.sortDir = this.sortDir === 1 ? -1 : 1;
    } else {
      this.sortField = field;
      this.sortDir = 1;
    }

    this.applySort();
  }

  get paged() {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  totalPages() {
    return Math.max(
      1,
      Math.ceil(this.filtered.length / this.pageSize)
    );
  }

  goTo(id: number) {
    this.router.navigate(['/validacion', id]);
  }
}