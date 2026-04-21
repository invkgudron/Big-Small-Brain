import os
import json
import glob
from PIL import Image, ImageFilter

def create_drop_shadow(image, offset=(0, 20), blur=15, color=(0, 0, 0, 150)):
    if blur <= 0:
        return Image.new('RGBA', image.size, (0, 0, 0, 0)) # No shadow
    shadow = Image.new('RGBA', image.size, (0, 0, 0, 0))
    alpha = image.split()[-1]
    shadow.paste(color, (0, 0), alpha)
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    
    shadow_offset = Image.new('RGBA', shadow.size, (0,0,0,0))
    shadow_offset.paste(shadow, offset)
    return shadow_offset

def load_config(config_path):
    with open(config_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def run_compositions(config_path):
    config = load_config(config_path)
    vault_root = config["settings"]["vault_root"]
    ai_folder = config["settings"]["ai_generated_folder"]
    
    for comp in config["compositions"]:
        print(f"--- Processing: {comp['id']} ---")
        
        # Resolve paths
        product_path = os.path.join(vault_root, os.path.normpath(comp["render"]))
        output_path = os.path.join(vault_root, os.path.normpath(comp["target_file"]))
        
        bg_pattern = os.path.join(ai_folder, comp["background_pattern"])
        bg_matches = glob.glob(bg_pattern)
        
        if not bg_matches:
            print(f"Error: No background found matching {bg_pattern}")
            continue
            
        bg_path = bg_matches[0] # Use most recently matched or first matched
        
        # Load params
        params = comp["parameters"]
        scale_factor = params.get("scale_factor", 0.7)
        y_offset = params.get("y_offset", 0)
        shadow_offset_y_pct = params.get("shadow_offset_y", 0.03)
        shadow_blur_pct = params.get("shadow_blur", 0.02)
        
        print(f"Pasting {os.path.basename(product_path)} onto {os.path.basename(bg_path)}...")
        
        try:
            bg = Image.open(bg_path).convert("RGBA")
            product = Image.open(product_path).convert("RGBA")
            
            # Calculate target size
            bg_w, bg_h = bg.size
            prod_w, prod_h = product.size
            
            target_h = int(bg_h * scale_factor)
            target_w = int((prod_w / prod_h) * target_h)
            
            product = product.resize((target_w, target_h), Image.Resampling.LANCZOS)
            
            # Calculate coordinates
            x = (bg_w - target_w) // 2
            if y_offset < 0: # bottom pad
                y = bg_h - target_h + y_offset
            else: # center + offset
                y = (bg_h - target_h) // 2 + y_offset
                
            # Create Shadow
            shadow_off = int(bg_h * shadow_offset_y_pct)
            shadow_blur = int(bg_h * shadow_blur_pct)
            shadow = create_drop_shadow(product, offset=(0, shadow_off), blur=shadow_blur)
            
            # Composite
            final = bg.copy()
            final.paste(shadow, (x, y), shadow)
            final.paste(product, (x, y), product)
            
            final.convert("RGB").save(output_path, quality=95)
            print(f"Success! Saved to {comp['target_file']}\n")
            
        except Exception as e:
            print(f"Failed compositing {comp['id']}: {str(e)}\n")

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    config_file = os.path.join(script_dir, "compositing_config.json")
    run_compositions(config_file)
