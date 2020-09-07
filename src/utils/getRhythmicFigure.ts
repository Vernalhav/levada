import { RHYTHMIC_FIGURE_NAMES } from '../assets/RhythmicFigures';

/**
 * Returns string representing a valid
 * rhythmic figure. If figure is not
 * specified, returns random valid figure.
 * @param figure type of figure to return
 */
export default function getRhythmicFigure(selectedFigures: { [figure: string]: boolean }, figure?: string): string {
    if (!figure) {
        const allowedFigures: Array<string> = [];
        for (const [figure, selected] of Object.entries(selectedFigures)) if (selected) allowedFigures.push(figure);

        return allowedFigures[Math.floor(Math.random() * allowedFigures.length)];
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
