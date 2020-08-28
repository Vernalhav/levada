/**
 * Return x if x is in range [a, b] or the
 * closest interval extreme if it isn't
 * @param a Lower bound
 * @param x Clamped element
 * @param b Upper bound
 */
export default function clamp(a: number, x: number, b: number): number {
    return Math.min(Math.max(x, a), b);
}
