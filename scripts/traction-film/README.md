# Traction films

The French landing film runs for 76 seconds. It reuses the English motion design and score with a French voice, artwork and locally recorded Traction screens. The separate 78-second French walkthrough follows a fictional booking app from first impression to market research. Its businesses, emails, publications and proposed actions are examples. The English walkthrough keeps the recorded November 2026 run and its original 147-second timeline.

The English hero’s HD OS scene uses an existing line from the original voice session. The closing addresses in both English films point to the current commercial site. The French voice is Kokoro’s stock French voice, `ff_siwis`. Nothing in either French film requires a voice service at playback.

## Rebuild

The source recordings and audio stems for the original live action film are in the Hyperdrift working archive, `.growth/traction/launch/growth-team-film`. Keep these private. Public outputs live under `public/traction`. Captions and French walkthrough chapter metadata live under `public/assets`.

Use a directory outside Git for a build. The scripts use FFmpeg, ffprobe, Playwright with Chrome, Pillow, NumPy, SoundFile, and Kokoro ONNX v1. For voice synthesis, place the compatible Kokoro English/French ONNX model and voice pack in a local directory as `kokoro.onnx` and `voices.bin`. The walkthrough uses macOS Georgia and Arial. These are build-time tools.

1. Start the Traction app on loopback with its isolated E2E engine, dry outbox, local stub services and a fresh test database. Run `fixture-fr.py` in place of `traction.e2e_fixture` with the same port options. It supplies fictional French businesses and a French example briefing. The capture script refuses non-local targets, blocks remote browser requests and uses a virtual passkey.
2. Run `FILM_APP=http://localhost:3896 node capture-fr.cjs "$CAPTURE"`. The output directory should be empty. Retain the single recording, timed markers and unedited screen captures. `PLAYWRIGHT_PATH` can point to the app’s installed Playwright. Run `python product-plates.py "$CAPTURE"` to frame the original captures for the hero.
3. For French, run `python voice-fr.py "$MODELS" "$BUILD/fr/voice"`. For each language, create its build directory and run `node render.cjs "$LANGUAGE" "$ORIGINAL" "$CAPTURE" "$BUILD/$LANGUAGE"`, then `python mix.py "$LANGUAGE" "$ORIGINAL" "$BUILD/$LANGUAGE"`. Clear the frames directory when rerendering a changed timeline.
4. Run `python encode-hero.py "$LANGUAGE" "$BUILD/$LANGUAGE" "$ORIGINAL" "$MP4"`. Copy the generated `hero.vtt` to the matching public captions path. The English mobile variant is a 1280×720 encode of the revised English master. The French hero poster is frame 39.5 seconds.
5. Run `python tour-fr.py "$CAPTURE" "$MODELS" "$BUILD/fr/tour"` for the French walkthrough. It writes its MP4, poster and captions and uses the same chapter timings as the page. To change the voiceover, clear cached `voice-*.wav` in the tour build directory.
6. For the English walkthrough, `python repair-tour-en.py "$ORIGINAL_TOUR" "$OUTPUT_TOUR" "$BUILD/en/tour"` replaces the closing domain at both resolutions. The input and output directories must differ. The original English walkthrough footage and its evidence labels stay in that recording.

Check the final encoded pictures, including the in-frame URLs, the recovered speech, the timed caption tracks, and actual playback and chapter seeks in both locale pages.
