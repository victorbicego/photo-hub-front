import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ResetPasswordRequestService} from '../../../../services/reset-password-request/reset-password-request.service';

@Component({
  selector: 'app-reset-password-modal',
  imports: [
    ReactiveFormsModule, FormsModule, CommonModule
  ],
  templateUrl: './reset-password-modal.component.html',
  styleUrl: './reset-password-modal.component.scss'
})
export class ResetPasswordModalComponent {
  @Output() emitClose = new EventEmitter<void>();

  isEmailSent: boolean = false;
  isCodeSent: boolean = false;

  email: string = '';
  code: string = '';
  password: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private resetPasswordRequestService: ResetPasswordRequestService) {
  }

  onClose(): void {
    this.emitClose.emit();
  }

  sendEmail(): void {
    if (this.email != '') {
      this.resetPasswordRequestService.sendResetPasswordEmail({
        "username": this.email
      }).subscribe({
        next: (response) => {
          this.isEmailSent = true;
          console.log('Email sent successfully:', response);
        },
        error: (error) => {
          console.error('Error sending email:', error);
        }
      });
    }
  }

  sendCode(): void {
    if (this.code != null) {
      this.isCodeSent = true;
    }
  }

  updatePassword(): void {
    this.resetPasswordRequestService.confirmNewPassword({
      "username": this.email,
      "code": this.code,
      "password": this.password
    }).subscribe({
      next: (response) => {
        this.resetAllVariables();
        this.emitClose.emit();
      },
      error: (error) => {
        console.error('Error resting password', error);
      }
    })
  }

  resetAllVariables(): void {
    this.isEmailSent = false;
    this.isCodeSent = false;
    this.email = '';
    this.code = '';
    this.password = '';
  }
}
