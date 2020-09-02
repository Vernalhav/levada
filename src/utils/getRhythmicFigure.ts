import { RHYTHMIC_FIGURE_NAMES } from '../assets/RhythmicFigures';

/**
 * Returns string representing a valid
 * rhythmic figure. If figure is not
 * specified, returns random valid figure.
 * @param figure type of figure to return
 */
export default function getRhythmicFigure(selectedFigures: { [figure: string]: boolean }, figure?: string): string {
    if (!figure) {
        return RHYTHMIC_FIGURE_NAMES[Math.floor(Math.random() * RHYTHMIC_FIGURE_NAMES.length)];
    }
    if (!selectedFigures.hasOwnProperty(figure)) {
        throw new RangeError(`Invalid rhythmic figure: ${figure}`);
    }
    return figure;
}

export function getAllFigures(): { [name: string]: boolean } {
    const figures: { [name: string]: boolean } = {};
    RHYTHMIC_FIGURE_NAMES.forEach((element) => {
        figures[element] = true;
    });
    return figures;
}
