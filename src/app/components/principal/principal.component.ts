import { Component, OnInit } from "@angular/core";
import { Boda } from "src/app/clases/boda";
import { NavigationExtras, Router } from "@angular/router";
import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite";
import { Platform, ToastController } from "@ionic/angular";
import { DbserviceService } from "src/app/services/dbservice.service";
import { ModalController } from "@ionic/angular";
import { ApicoctelesService } from "src/app/services/apicocteles.service";

@Component({
  selector: "app-principal",
  templateUrl: "./principal.component.html",
  styleUrls: ["./principal.component.scss"],
})
export class PrincipalComponent implements OnInit {
  searchTerm: string = "";

  bodasAlrededor: any = [
    {
      Novios: "Los novios",
      Menu: "El menu",
      Coctel: "El trago",
      Lugar: "El lugar",
      fecha: "La fecha",
    },
  ]

  bodas: any = [
    {
      descripcion: "Escribe aqui datos de interés",
      investrella: "Escribe aqui tu invitado especial",
      menuestrella: "Escribe aqui tu menu especial",
      tragoestrella: "Escribe aqui tu traguito especial",
      lugar: "Escribe aqui el lugar de tu boda",
      fecha: "Escribe aqui la fecha de tu boda",
    },
  ];

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(
    private router: Router,
    private servicioBD: DbserviceService,
    private modalController: ModalController,
    private apiService: ApicoctelesService
  ) {
    this.router.navigate(["inicio/boda"]);
  }

  ngOnInit() {
    this.servicioBD.dbState().subscribe((res: any) => {
      if (res) {
        this.servicioBD.fetchBodas().subscribe((item: any) => {
          this.bodas = item;
        });
      }
      //this.servicioBD.presentAlert("4");
    });
  }

  getItem($event: any) {
    const valor = $event.target.value;
    console.log("valor del control: " + valor);
  }

  editar(item: any) {
    let navigationextras: NavigationExtras = {
      state: {
        idEnviado: item.id,
        descripcionEnviado: item.descripcion,
        investrella: item.investrella,
        menuestrella: item.menuestrella,
        tragoestrella: item.tragoestrella,
        lugarEnviado: item.lugar,
        fechaEnviado: item.fecha,
      },
    };
    this.router.navigate(["/modboda"], navigationextras);
  }

  eliminar(item: any) {
    this.servicioBD.deleteBoda(item.id);
    this.servicioBD.presentToast("Haz eliminado tu boda :( !!!");
  }

  // Función para cambiar de página según el valor del ion-segment
  // segmentChanged(event: any) {
  //   const selectedSegment = event.detail.value;

  //   if (selectedSegment === 'Boda') {
  //     // Redirige a la página "Boda"
  //     this.router.navigate(['/boda']);
  //   }
  // }
  segmentChanged($event: any) {
    console.log($event);
    let direccion = $event.detail.value;
    this.router.navigate(["inicio/" + direccion]);
  }

  searchItems(event: CustomEvent) {
    const searchTerm = this.searchTerm.toLowerCase(); // Obtén el término de búsqueda en minúsculas
    if (searchTerm.trim() !== "") {
      // Filtra los elementos según el término de búsqueda
      this.bodas = this.bodas.filter((item: any) => {
        return (
          item.descripcion.toLowerCase().includes(searchTerm) ||
          item.investrella.toLowerCase().includes(searchTerm) ||
          item.menuestrella.toLowerCase().includes(searchTerm) ||
          item.tragoestrella.toLowerCase().includes(searchTerm) ||
          item.lugar.toLowerCase().includes(searchTerm) ||
          item.fecha.toLowerCase().includes(searchTerm)
        );
      });
    } else {
      // Si el campo de búsqueda está vacío, muestra todos los elementos nuevamente
      this.servicioBD.fetchBodas().subscribe((items: any) => {
        this.bodas = items;
      });
    }
  }
  loadBodas() {
    this.apiService.getPosts().subscribe(
      (data: any) => {
        this.bodasAlrededor = data; // Asigna los datos obtenidos a la variable 'bodaAlrededor'
        this.openBodasModal();
      },
      (error: any) => {
        console.error('Error al obtener los datos de bodas', error);
      }
    );
  }
  
  openBodasModal() {
    this.setOpen(true);
  }
  
}
