import React,{useEffect,useState} from "react";
import { IonContent, IonPage, IonIcon,IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonButton } from '@ionic/react'
import './Video.css'
import GetUrl  from './../../global'

const Video = () => {	
	const sissoa: any = window["sissoa"]
	const generatedCall = () => {
		sissoa.setUIElement("#videocall");
		let name = generateRandomString(20)
		sissoa.setRoom({
			name: name,
			camera: true,
		})
		sissoa.onMuted = function(e:any){
			console.log("onMuted", e);
		}
		sissoa.init();
		sendLinkMeet(name)
	}

	const sendLinkMeet = (params: any) => {
		var formData = new FormData()
		let myHeaders = new Headers();
		let token = localStorage.getItem('token')
		formData.append('meetCode',params)
		myHeaders.append('Authorization','Bearer '+token)

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: formData,
		};
		fetch(GetUrl.GetUrl + 'insert/meet',requestOptions)
		.then(response => {
			console.log(response)
		})
		.catch(err => {
			console.log("Error",err)
		})
	}

	const  generateRandomString = (num:number) => {
		const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let result1= ' ';
		const charactersLength = characters.length;
		for ( let i = 0; i < num; i++ ) {
			result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
	
		return result1;
	}

	useEffect(() => {
		generatedCall()
	},[])
	return (
		<IonPage>
			<IonContent>
				<div className="text-center body-video">
					<h4>Indicanos tu nombre para llamarte</h4>
				</div>
				<div id="videocall"></div>
			</IonContent>
		</IonPage>
	)
}

export default Video