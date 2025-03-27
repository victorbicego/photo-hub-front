import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingHolderService} from '../../../../services/holders/loading-holder/loading-holder.service';
import {AuthenticationService} from '../../../../services/authentication/authentication.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-credentials-login-card',
  imports: [
    FormsModule,
  ],
  templateUrl: './credentials-login-card.component.html',
  styleUrl: './credentials-login-card.component.scss'
})
export class CredentialsLoginCardComponent {
  @Output() emitToggle = new EventEmitter<void>();

  username = '';
  password = '';

  constructor(private loadingHolderService: LoadingHolderService, private authenticationService: AuthenticationService, private router: Router) {
  }

  loginWithCredentials(): void {
    this.loadingHolderService.isLoading = true;
    this.authenticationService
      .authenticate(this.username, this.password)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          this.loadingHolderService.isLoading = false;
          console.error('Login with credentials failed', err);
        },
      });
  }

  toggleResetPasswordModal(): void {
    this.emitToggle.emit();
  }

}
