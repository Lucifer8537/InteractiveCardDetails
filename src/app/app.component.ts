import { Component, OnInit } from '@angular/core';
import { LABEL } from './label.constant';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'interactiveCardDetails';
  cardholdername!: string;
  cardnumber!: string;
  mm!: number | null;
  yy!: number | null;
  cvc!: number | null;
  cardholdernameerr = false;
  cardnumbererr = false;
  mmerr = false;
  yyerr = false;
  cvcerr = false;
  cardnumbernumericerr = false;
  cardnumberlengtherr = false;
  finalcardnumber = '0000 0000 0000 0000';
  finalname = 'Jane Appleseed';
  finalmm = '00';
  finalyy = '00';
  finalcvc = '000';
  submitted = false;
  Label = {
    CARDHOLDERNAME: LABEL.CARDHOLDERNAME,
    CARDNUMBER: LABEL.CARDNUMBER,
    EXPDATE: LABEL.EXPDATE,
    CVC: LABEL.CVC,
    CONFIRM: LABEL.CONFIRM,
    CARDHOLDERNAME_PLACEHOLDER: LABEL.CARDHOLDERNAME_PLACHOLDER,
    CARDNUMBER_PLACEHOLDER: LABEL.CARDNUMBER_PLACEHOLDER,
    MM_U: LABEL.MM_U,
    YY_U: LABEL.YY_U,
    CVC_PLACEHOLDER: LABEL.CVC_PLACEHOLDER,
    BLANK_ERR: LABEL.BLANK_ERR,
    FORMAT_ERR: LABEL.FORMAT_ERR,
    CARDNUMBER_LESS: LABEL.CARDNUMBER_LESS,
    THANK_YOU: LABEL.THANK_YOU,
    CARD_DETAILS: LABEL.CARD_DETAILS,
  };
  isDesktopView!: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {}
  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isDesktopView = !result.matches;
      });
  }

  onSubmit = () => {
    if (this.cardholdername) {
      this.cardholdernameerr = false;
      this.finalname = this.cardholdername;
    } else {
      this.cardholdernameerr = true;
      this.finalname = 'Jane Appleseed';
    }
    if (this.cardnumber) {
      this.cardnumbererr = false;
      this.finalcardnumber = this.cardnumber;
    } else {
      this.cardnumbererr = true;
      this.cardnumberlengtherr = false;
      this.cardnumbernumericerr = false;
      this.finalcardnumber = '0000 0000 0000 0000';
    }
    if (this.mm) {
      this.mmerr = false;
      this.finalmm = this.formatNumberAsTwoDigits(this.mm);
    } else {
      this.mmerr = true;
      this.finalmm = '00';
    }
    if (this.yy) {
      this.yyerr = false;
      this.finalyy = this.formatNumberAsTwoDigits(this.yy);
    } else {
      this.yyerr = true;
      this.finalyy = '00';
    }
    if (this.cvc) {
      this.cvcerr = false;
      this.finalcvc = this.cvc.toString();
    } else {
      this.cvcerr = true;
      this.finalcvc = '000';
    }
    if (this.cardnumber)
      this.cardnumbernumericerr = !this.isStringNumeric(this.cardnumber);
    if (this.cardnumbernumericerr) {
      this.cardnumbererr = false;
      this.cardnumberlengtherr = false;
    }
    if (this.cardnumber && this.cardnumber.length < 19) {
      this.cardnumberlengtherr = true;
      this.cardnumbernumericerr = false;
      this.cardnumbererr = false;
    }
    if (
      !this.cardholdernameerr &&
      !this.cardnumbererr &&
      !this.cardnumberlengtherr &&
      !this.cardnumbernumericerr &&
      !this.mmerr &&
      !this.yyerr &&
      !this.cvcerr
    )
      this.submitted = true;
    else this.submitted = false;
  };

  isStringNumeric = (input: string): boolean => {
    const numericRegex = /^[0-9\s]+$/;
    return numericRegex.test(input);
  };

  cardholdernameChange = (event: any) => {
    if (event.target.id === 'cardholdername') this.cardholdernameerr = false;
    else if (event.target.id === 'cardnumber') {
      this.cardnumbererr = false;
      this.cardnumberlengtherr = false;
      this.cardnumbernumericerr = false;
    } else if (event.target.id === 'mm') this.mmerr = false;
    else if (event.target.id === 'yy') this.yyerr = false;
    else if (event.target.id === 'cvc') this.cvcerr = false;
  };

  formatNumberAsTwoDigits = (number: number): string => {
    return number.toString().padStart(2, '0');
  };

  formatInput(event: any) {
    console.log(this.cardnumber);
    const input = event.target as HTMLInputElement;
    const inputValue = input.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
    input.value = inputValue.trim();
  }

  onClickContinue = () => {
    this.submitted = false;
    this.cardholdername = '';
    this.cardnumber = '';
    this.mm = null;
    this.yy = null;
    this.cvc = null;
    this.finalcardnumber = '0000 0000 0000 0000';
    this.finalname = 'Jane Appleseed';
    this.finalmm = '00';
    this.finalyy = '00';
    this.finalcvc = '000';
  };
}
