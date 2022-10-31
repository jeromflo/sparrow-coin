import { Component, OnInit } from '@angular/core';
import { SocketClientService } from 'src/app/shared/services/socketClient/socket-client.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  constructor(private socketService: SocketClientService) {}

  ngOnInit(): void {}
}
