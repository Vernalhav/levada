import { RHYTHMIC_FIGURE_NAMES } from '../assets/rhythmic_figures';

/**
 * Returns string representing a valid
 * rhythmic figure. If figure is not
 * specified, returns random valid figure.
 * @param figure type of figure to return
 */
export default function getRhythmicFigure(figure?: string): string {
    if (!figure) return RHYTHMIC_FIGURE_NAMES[Math.floor(Math.random() * RHYTHMIC_FIGURE_NAMES.length)];
    if (!RHYTHMIC_FIGURE_NAMES.hasOwnProperty(figure.toLowerCase())) {
        throw new RangeError(`Invalid rhythmic figure: $(figure)`);
    }
    return figure;
}
