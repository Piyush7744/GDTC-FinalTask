import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SharesService } from '../services/shareService/shares.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private service: SharesService,private router:Router) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      company: [''],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value)
      this.service.contact(this.contactForm.value).subscribe({
        next: () => {
          alert('Message sent successfully');
          this.router.navigate(['/'])
        },
        error: () => alert('Something went wrong'),
      });
    }
  }
}
