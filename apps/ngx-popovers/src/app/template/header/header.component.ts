import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dm-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Output()
  toggleSidebar = new EventEmitter();


  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
