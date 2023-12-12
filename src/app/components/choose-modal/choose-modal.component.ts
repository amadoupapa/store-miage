import { Component, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-choose-modal',
  templateUrl: './choose-modal.component.html',
  styleUrls: ['./choose-modal.component.css'],
})
export class ChooseModalComponent {
  @ViewChild('fileUploadModal') fileUploadModal: any;
  private modalRef: NgbModalRef | undefined;
  selectedFile: any;

  constructor(private modalService: NgbModal) {}

  openModal() {
    this.modalRef = this.modalService.open(this.fileUploadModal, {
      ariaLabelledBy: 'modal-title',
    });
  }

  onFileSelected(event: any) {
    // Gérer le fichier sélectionné ici sans fermer le modal
    const file: File = event.target.files[0];
    this.selectedFile = file;
    if (file) {
      console.log(file);
    }
  }

  saveFile(modal: NgbModalRef) {
    // Gérer le fichier sélectionné ici
    // Fermer le modal manuellement
    alert(this.selectedFile.name);
    modal.close('save');
  }
}
