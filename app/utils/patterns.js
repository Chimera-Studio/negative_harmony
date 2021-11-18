export const musicScale = [
  "C",
  "C♯ D♭",
  "D",
  "D♯ E♭",
  "E",
  "F",
  "F♯ G♭",
  "G",
  "G♯ A♭",
  "A",
  "A♯ B♭",
  "B",
];

export const scales = {
  major: [0, 2, 4, 5, 7, 9, 11, 0],
  /* major Pattern: R + 2 + 2 + 1 + 2 + 2 + 2 + R */

  naturalMinor: [0, 2, 3, 5, 7, 8, 10, 0],
  /* naturalMinor Pattern: R + 2 + 1 + 2 + 2 + 1 + 2 + R */

  harmonicMinor: [0, 2, 3, 5, 7, 8, 11, 0],
  /* harmonicMinor Pattern: R + 2 + 1 + 2 + 2 + 1 + 3 + R */

  melodicMinor: [0, 2, 3, 5, 7, 9, 11, 0],
  /* melodicMinor Pattern: R + 2 + 1 + 2 + 2 + 2 + 2 + R */

  chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0],
  /* chromatic Pattern: R + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + R */

  wholeTone: [0, 2, 4, 6, 8, 10, 0],
  /* wholeTone Pattern: R + 2 + 2 + 2 + 2 + 2 + R */

  majorPentatonic: [0, 2, 4, 7, 9, 0],
  /* majorPentatonic Pattern: R + 2 + 2 + 3 + 2 + R */

  minorPentatonic: [0, 3, 5, 7, 10, 0],
  /* minorPentatonic Pattern: R + 3 + 2 + 2 + 3 + R */

  ionian: [0, 2, 4, 5, 7, 9, 11, 0],
  /* ionian Pattern: R + 2 + 2 + 1 + 2 + 2 + 2 + R */

  dorian: [0, 2, 3, 5, 7, 9, 10, 0],
  /* dorian Pattern: R + 2 + 1 + 2 + 2 + 2 + 1 + R */

  phrygian: [0, 1, 3, 5, 7, 8, 10, 0],
  /* phrygian Pattern: R + 1 + 2 + 2 + 2 + 1 + 2 + R */

  lydian: [0, 2, 4, 6, 7, 9, 11, 0],
  /* lydian Pattern: R + 2 + 2 + 2 + 1 + 2 + 2 + R */

  mixolydian: [0, 2, 4, 5, 7, 9, 10, 0],
  /* mixolydian Pattern: R + 2 + 2 + 1 + 2 + 2 + 1 + R */

  aeolian: [0, 2, 3, 5, 7, 8, 10, 0],
  /* aeolian Pattern: R + 2 + 1 + 2 + 2 + 1 + 2 + R */

  locrian: [0, 1, 3, 5, 6, 8, 10, 0],
  /* locrian Pattern: R + 1 + 2 + 2 + 1 + 2 + 2 + R */
};

export const scaleList = [
  { name: "Major", value: scales.major },
  { name: "Natural Minor", value: scales.naturalMinor },
  { name: "Harmonic Minor", value: scales.harmonicMinor },
  { name: "Melodic Minor", value: scales.melodicMinor },
  { name: "Chromatic", value: scales.chromatic },
  { name: "Whole Tone", value: scales.wholeTone },
  { name: "Major Pentatonic", value: scales.majorPentatonic },
  { name: "Minor Pentatonic", value: scales.minorPentatonic },
  { name: "Ionian", value: scales.ionian },
  { name: "Dorian", value: scales.dorian },
  { name: "Phrygian", value: scales.phrygian },
  { name: "Lydian", value: scales.lydian },
  { name: "Mixolydian", value: scales.mixolydian },
  { name: "Aeolian", value: scales.aeolian },
  { name: "Locrian", value: scales.locrian },
];

export const chords = {
  major: [0, 4, 7],
  /* major Pattern: 0, 4, 1 */

  minor: [0, 3, 7],
  /* minor Pattern: 0, 9, 1 */

  major7: [0, 4, 7, 11],
  /* major7 Pattern: 0, 4, 1, 5 */

  minor7: [0, 3, 7, 10],
  /* minor7 Pattern: 0, 9, 1, 10 */

  m7flat5: [0, 3, 6, 10],
  /* m7flat5 Pattern: 0, 9, 6, 10 */

  major9: [0, 4, 7, 11, 2],
  /* major9 Pattern: 0, 4, 1, 5, 2 */

  minor9: [0, 3, 7, 10, 2],
  /* m9 Pattern: 0, 4, 1, 5, 2 */

  minor6: [0, 3, 7, 9],
  /* m6 Pattern: 0, 9, 1, 3 */

  sus2: [0, 2, 7],
  /* sus2 Pattern: 0, 2, 1 */

  sus4: [0, 5, 7],
  /* sus4 Pattern: 0, 11, 1 */

  dim: [0, 3, 6],
  /* dim Pattern: 0, 9, 6 */

  aug: [0, 4, 8],
  /* aug Pattern: 0, 4, 8 */

  chord5: [0, 7, 0],
  /* 5 chord Pattern: 0, 1, 0 */

  chord6: [0, 4, 7, 9],
  /* 6 chord Pattern: 0, 4, 1, 3 */

  dominant7: [0, 4, 7, 10],
  /* dominant7 Pattern: 0, 4, 1, 10 */

  diminished7: [0, 9, 6, 8],
  /* diminished7 Pattern: 0, 3, 6, 8 */

  dom7sus4: [0, 5, 7, 11],
  /* dominant9 Pattern: 0, 11, 1, 5 */

  m6Neg: [0, 2, 6, 9],
  /* m6Neg Pattern: 0, 2, 6, 3 */

  /*
  dominant9: [0, 4, 1, 10, 2],
  dominant9 Pattern: 0, 4, 7, 10, 2 */

  /*
  dominant11: [0, 4, 1, 10, 2, 5],
  dominant11 Pattern: 0, 4, 7, 10, 2, 11 */

  /*
  dominant13: [0, 4, 1, 10, 2, 5, 0],
  dominant13 Pattern: 0, 4, 7, 10, 2, 11, 0 */
};

export const chordList = [
  { name: "Major", value: chords.major },
  { name: "Minor", value: chords.minor },
  { name: "Major 7", value: chords.major7 },
  { name: "Minor 7", value: chords.minor7 },
  { name: "Minor 7♭ 5", value: chords.m7flat5 },
  { name: "Major 9", value: chords.major9 },
  { name: "Minor 6", value: chords.minor6 },
  { name: "Suspended 2", value: chords.sus2 },
  { name: "Suspended 4", value: chords.sus4 },
  { name: "Diminished", value: chords.dim },
  { name: "Augmented", value: chords.aug },
];
