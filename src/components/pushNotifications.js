import { environment } from "../environment";

export function getPushSubscription() {
    if ('serviceWorker' in navigator) {
        return navigator.serviceWorker.getRegistration().then((serviceWorkerRegistration) => {
            return serviceWorkerRegistration.pushManager.getSubscription().then(s => {
                if (null != s) {
                    return s;
                }
                else {
                    return serviceWorkerRegistration.pushManager.subscribe(
                        {
                            userVisibleOnly: true,
                            applicationServerKey: environment.NOTIFICATION_PUBLIC_KEY
                        }).then(
                            function (pushSubscription) {
                                return pushSubscription;
                            }, function (error) {
                                console.log(error);
                            });
                }
            });
        });
    }
    else {
        return Promise.reject("No serviceworker");
    }
}