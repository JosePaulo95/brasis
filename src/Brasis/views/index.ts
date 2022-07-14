

export function getBackgroundSprite (sprite_code: number) {
    const code = String(sprite_code).padStart(3, "0")
    return require('@/assets/Tilesets/terrain arido/tile'+code+'.png')
}