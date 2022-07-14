

export function getBackgroundSprite (type: String, sprite_code: number) {
    const code = String(sprite_code).padStart(3, "0")
    switch (type) {
        case "bg":
            return require('@/assets/Tilesets/terrain arido/tile'+code+'.png')
        case "actors":
            return require('@/assets/Actors/tile000.png')
        default:
            return require('@/assets/logo.png')
    }
    
}