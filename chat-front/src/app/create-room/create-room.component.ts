import { Component, OnInit } from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  hasName = false;

  session = '';

  enterSessionControl = new FormControl();
  nameControl = new FormControl();

  actions = {
    generate: false,
    enterSession: false,
    goToSession: false
  };

  constructor(private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.removeOldMessages();
    this.removeSession();
    this.removeId();
  }

  removeOldMessages(): void {
    localStorage.removeItem('messages');
  }

  removeSession(): void {
    localStorage.removeItem('session');
  }

  removeId(): void {
    localStorage.removeItem('id');
  }

  continueToCreateSession() {
    if (this.nameControl.value) {
      localStorage.setItem('name', this.nameControl.value);
      this.hasName = true;
    }
  }

  generateSession(): void {
    this.generateRandomChatToken();
    localStorage.setItem('session', this.session);
    this.clearEnterSessionVariables();
  }

  enterSession() {
    this.actions.enterSession = true;
    this.clearGenerateVariables();
  }

  generateRandomChatToken(): void {
    this.session = Math.random().toString(36).substring(7);
  }

  getEnterSessionControlValues(): void {
    this.session = this.session === '' ? this.enterSessionControl.value.trim() : this.session;
    localStorage.setItem('session', this.session);
    this.router.navigateByUrl('/chat');
  }

  isGenerateClicked(): boolean {
    return this.actions.generate;
  }

  isEnterSessionClicked(): boolean {
    return this.actions.enterSession;
  }

  isGoToSessionClicked(): boolean {
    return this.actions.goToSession;
  }

  clearGenerateVariables(): void {
    this.actions.generate = false;
    this.session = '';
  }

  clearEnterSessionVariables(): void {
    this.actions.enterSession = false;
  }

  copyCurrentSession(): void {
    const copyText = document.getElementById('session');
    const textArea = document.createElement('textarea');
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy');
    textArea.remove();
    this.showAlert();
  }

  showAlert(): void {
    this.alertService.info(`Copied session: ${this.session}`);
  }

}
