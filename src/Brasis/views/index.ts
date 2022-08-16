

export function getBackgroundSprite (type: String, sprite_code: number) {
    const code = String(sprite_code).padStart(3, "0")
    switch (type) {
        case "action-square":
            if(sprite_code)
                return require('@/assets/Tilesets/action-square/tile001.png')
        default:
            return require('@/assets/Tilesets/terrain arido/tile010.png')
    }
    
}