//Este código opcional é usado para registrar um service worker.
//register() não é chamado por padrão.

//Isso permite que o aplicativo carregue mais rápido em visitas subsequentes em produção e oferece
//ele recursos off-line. No entanto, isso também significa que os desenvolvedores (e usuários)
//só verá atualizações implantadas em visitas subsequentes a uma página, depois de todas as
//as guias existentes abertas na página foram fechadas, pois foram armazenadas em cache anteriormente
//os recursos são atualizados em segundo plano.



const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // O construtor de URL está disponível em todos os navegadores que suportam SW.
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {


            return;
        }

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            if (isLocalhost) {
                // Isso está sendo executado no localhost. Vamos verificar se um service worker ainda existe ou não.
                checkValidServiceWorker(swUrl, config);


                navigator.serviceWorker.ready.then(() => {
                    console.log(
                        'This web app is being served cache-first by a service ' +
                        'worker. '
                    );
                });
            } else {
                // Não é localhost. Basta registrar o service worker
                registerValidSW(swUrl, config);
            }
        });
    }
}

function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker == null) {
                    return;
                }
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            //Neste ponto, o conteúdo pré-cache atualizado foi buscado,
                            //mas o service worker anterior ainda atenderá o antigo
                            //conteúdo até que todas as sejam fechadas.
                            console.log(
                                'New content is available and will be used when all ' +
                                'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
                            );

                            // Execute callback
                            if (config && config.onUpdate) {
                                config.onUpdate(registration);
                            }
                        } else {

                            console.log('Content is cached for offline use.');

                            // Execute callback
                            if (config && config.onSuccess) {
                                config.onSuccess(registration);
                            }
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.error('Error during service worker registration:', error);
        });
}

function checkValidServiceWorker(swUrl, config) {
    // Verifique se o service worker pode ser encontrado. Se não conseguir recarregar a página.
    fetch(swUrl)
        .then(response => {
            // Verifique se o service worker existe e se realmente estamos obtendo um arquivo JS.
            const contentType = response.headers.get('content-type');
            if (
                response.status === 404 ||
                (contentType != null && contentType.indexOf('javascript') === -1)
            ) {
                //Nenhum service worker encontrado. Provavelmente um aplicativo diferente. Recarregue a página .
                navigator.serviceWorker.ready.then(registration => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // Service worker encontrado. Proceda normalmente.
                registerValidSW(swUrl, config);
            }
        })
        .catch(() => {
            console.log(
                'No internet connection found. App is running in offline mode.'
            );
        });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}