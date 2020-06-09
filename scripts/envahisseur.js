const primeColor = Color.valueOf("a3e3ff");
const lib = require("funclib");

const changeTeamEffect = newEffect(15, e => {
	Draw.color(primeColor, Color.valueOf("a3e3ff00"), e.fin());
	Fill.square(e.x, e.y, e.rotation * Vars.tilesize / 2);
	
	Draw.blend(Blending.additive);
	Draw.color(primeColor, Color.valueOf("2857ff"), e.fin());
	Lines.stroke(e.fout() * 4);
	Lines.square(e.x, e.y, (e.rotation * Vars.tilesize / 2) * e.fin());
	Draw.blend();
});

const shipTrail = newEffect(39, e => {
	Draw.blend(Blending.additive);
	Draw.color(Color.valueOf("59a7ff"), Color.valueOf("2857ff"), e.fin());
	Fill.circle(e.x, e.y, ((2 * e.fout()) * e.rotation) / 1.7);
	Draw.blend();
	
	//Draw.color(Color.valueOf("ffffff"));
	//Fill.circle(e.x, e.y, (1 * e.fout()) * (e.rotation / 1.3));
});

const envahisseurShootEffect = newEffect(10, e => {
	const vec1 = new Vec2();
	const vec2 = new Vec2();
	const vec3 = new Vec2();
	
	for(var i = 0; i < 7; i++){
		var rndRot = Mathf.randomSeedRange(e.id + i, 45);
		var rndRot2 = Mathf.randomSeedRange(e.id + 15 + i, 45);
		var rndRot3 = Mathf.randomSeedRange(e.id + 30 + i, 45);
		var rndRot4 = Mathf.randomSeedRange(e.id + 45 + i, 30);
		var rndRange = Mathf.randomSeed(e.id + 7 + i, 25, 50) / 50;
		var rndStroke = Mathf.randomSeed(e.id + 16 + i, 35, 50) / 50;
		
		vec1.trns(rndRot * e.fout() + (e.rotation + rndRot4), 15 * e.finpow() * rndRange);
		vec2.trns(rndRot2 * e.fout() + (e.rotation + rndRot4), 30 * e.finpow() * rndRange);
		vec3.trns(rndRot3 * e.fout() + (e.rotation + rndRot4), 45 * e.finpow() * rndRange);
	
		var posAx = e.x + vec1.x;
		var posAy = e.y + vec1.y;
	
		var posBx = e.x + vec2.x;
		var posBy = e.y + vec2.y;
	
		var posCx = e.x + vec3.x;
		var posCy = e.y + vec3.y;
	
		Draw.color(primeColor);
		Lines.stroke((e.fout() * 2) * rndStroke);
		Lines.curve(e.x, e.y, posAx, posAy, posBx, posBy, posCx, posCy, 16);
	}
});

const envahisseurBullet = extend(BasicBulletType, {
	hitUnit: function(b, unit){
		this.hit(b);
		if(unit.entity != null){
			if(unit.entity.health() < unit.entity.maxHealth() * 0.1){
				unit.setTeam(b.getTeam());
				if(unit.block() != null){
					Effects.effect(changeTeamEffect, unit.drawx(), unit.drawy(), unit.block().size);
				}
			};
			//print(tile.entity.health());
			//print(tile.entity.maxHealth() / 90)
		}
		//tile.setTeam(b.getTeam());
	},
	
	draw: function(b){
		/*Draw.color(primeColor);
		Lines.stroke(2);
		Lines.lineAngleCenter(b.x, b.y, b.rot(), 9);
		Draw.color(Color.white);
		Lines.lineAngleCenter(b.x, b.y, b.rot(), 4);
		Draw.reset();*/
		
		const lengthB = 8;
		const colors = [Color.valueOf("ffffff"), Color.valueOf("F4E8E8"), Color.valueOf("DCC6C6")];
		const tscales = [1, 0.8, 0.6];
		const strokes = [1.13, 0.6, 0.28];
		const lenscales = [1.0, 1.61, 1.97];
		const tmpColor = new Color();

		//Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
		for(var s = 0; s < 3; s++){
			//Draw.color(colors[s]);
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.5, 0.1)));
			for(var i = 0; i < 3; i++){
				Lines.stroke((3 + Mathf.absin(Time.time(), 3.2, 1)) * strokes[s] * tscales[i]);
				Tmp.v1.trns(b.rot() + 180, lengthB * lenscales[i] / 2);
				//Lines.lineAngleCenter(b.x, b.y, b.rot(), 5 * lenscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), lengthB * lenscales[i], CapStyle.none);
			}
		};
		Draw.reset();
	}
});
envahisseurBullet.speed = 8;
envahisseurBullet.damage = 12;
envahisseurBullet.lifetime = 24;
envahisseurBullet.splashDamageRadius = 20;
envahisseurBullet.splashDamage = 8;
envahisseurBullet.hitSize = 8;
envahisseurBullet.bulletWidth = 7;
envahisseurBullet.bulletHeight = 9;
envahisseurBullet.bulletShrink = 0;
envahisseurBullet.keepVelocity = true;

const unitEnvahisseurBullet = extend(BasicBulletType, {
	hitUnit: function(b, unit){
		this.hit(b);
		if(unit.entity != null){
			if(unit.entity.health() < unit.entity.maxHealth() * 0.5){
				unit.setTeam(b.getTeam());
			};
			//print(tile.entity.health());
			//print(tile.entity.maxHealth() / 90)
		}
		//tile.setTeam(b.getTeam());
	},
	
	draw: function(b){
		/*Draw.color(primeColor);
		Lines.stroke(2);
		Lines.lineAngleCenter(b.x, b.y, b.rot(), 9);
		Draw.color(Color.white);
		Lines.lineAngleCenter(b.x, b.y, b.rot(), 4);
		Draw.reset();*/
		
		const lengthB = 8;
		const colors = [Color.valueOf("ffffff"), Color.valueOf("F4E8E8"), Color.valueOf("DCC6C6")];
		const tscales = [1, 0.8, 0.6];
		const strokes = [1.13, 0.6, 0.28];
		const lenscales = [1.0, 1.61, 1.97];
		const tmpColor = new Color();

		//Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
		for(var s = 0; s < 3; s++){
			//Draw.color(colors[s]);
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.5, 0.1)));
			for(var i = 0; i < 3; i++){
				Lines.stroke((3 + Mathf.absin(Time.time(), 3.2, 1)) * strokes[s] * tscales[i]);
				Tmp.v1.trns(b.rot() + 180, lengthB * lenscales[i] / 2);
				//Lines.lineAngleCenter(b.x, b.y, b.rot(), 5 * lenscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), lengthB * lenscales[i], CapStyle.none);
			}
		};
		Draw.reset();
	}
});
unitEnvahisseurBullet.speed = 8;
unitEnvahisseurBullet.damage = 12;
unitEnvahisseurBullet.lifetime = 24;
unitEnvahisseurBullet.splashDamageRadius = 20;
unitEnvahisseurBullet.splashDamage = 8;
unitEnvahisseurBullet.hitSize = 8;
unitEnvahisseurBullet.bulletWidth = 7;
unitEnvahisseurBullet.bulletHeight = 9;
unitEnvahisseurBullet.bulletShrink = 0;
unitEnvahisseurBullet.keepVelocity = true;

const envahisseurBullett = extend(BasicBulletType, {
	hitTile: function(b, tile){
		this.hit(b);
		if(tile.entity != null){
			if(tile.entity.health() < tile.entity.maxHealth() * 0.5){
				tile.setTeam(b.getTeam());
				if(tile.block() != null){
					Effects.effect(changeTeamEffect, tile.drawx(), tile.drawy(), tile.block().size);
				}
			};
			//print(tile.entity.health());
			//print(tile.entity.maxHealth() / 90)
		}
		//tile.setTeam(b.getTeam());
	},
	
	draw: function(b){
		/*Draw.color(primeColor);
		Lines.stroke(2);
		Lines.lineAngleCenter(b.x, b.y, b.rot(), 9);
		Draw.color(Color.white);
		Lines.lineAngleCenter(b.x, b.y, b.rot(), 4);
		Draw.reset();*/
		
		const lengthB = 8;
		const colors = [Color.valueOf("ffffff"), Color.valueOf("F4E8E8"), Color.valueOf("DCC6C6")];
		const tscales = [1, 0.8, 0.6];
		const strokes = [1.13, 0.6, 0.28];
		const lenscales = [1.0, 1.61, 1.97];
		const tmpColor = new Color();

		//Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
		for(var s = 0; s < 3; s++){
			//Draw.color(colors[s]);
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.5, 0.1)));
			for(var i = 0; i < 3; i++){
				Lines.stroke((3 + Mathf.absin(Time.time(), 3.2, 1)) * strokes[s] * tscales[i]);
				Tmp.v1.trns(b.rot() + 180, lengthB * lenscales[i] / 2);
				//Lines.lineAngleCenter(b.x, b.y, b.rot(), 5 * lenscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), lengthB * lenscales[i], CapStyle.none);
			}
		};
		Draw.reset();
	}
});
envahisseurBullett.speed = 8;
envahisseurBullett.damage = 12;
envahisseurBullett.lifetime = 24;
envahisseurBullett.splashDamageRadius = 20;
envahisseurBullett.splashDamage = 8;
envahisseurBullett.hitSize = 8;
envahisseurBullett.bulletWidth = 7;
envahisseurBullett.bulletHeight = 9;
envahisseurBullett.bulletShrink = 0;
envahisseurBullett.keepVelocity = true;

const unitEnvahisseurBullett = extend(BasicBulletType, {
	hitTile: function(b, tile){
		this.hit(b);
		if(tile.entity != null){
			if(tile.entity.health() < tile.entity.maxHealth() * 0.1){
				tile.setTeam(b.getTeam());
				if(tile.block() != null){
					Effects.effect(changeTeamEffect, tile.drawx(), tile.drawy(), tile.block().size);
				}
			};
			//print(tile.entity.health());
			//print(tile.entity.maxHealth() / 90)
		}
		//tile.setTeam(b.getTeam());
	},
	
	draw: function(b){
		/*Draw.color(primeColor);
		Lines.stroke(2);
		Lines.lineAngleCenter(b.x, b.y, b.rot(), 9);
		Draw.color(Color.white);
		Lines.lineAngleCenter(b.x, b.y, b.rot(), 4);
		Draw.reset();*/
		
		const lengthB = 8;
		const colors = [Color.valueOf("ffffff"), Color.valueOf("F4E8E8"), Color.valueOf("DCC6C6")];
		const tscales = [1, 0.8, 0.6];
		const strokes = [1.13, 0.6, 0.28];
		const lenscales = [1.0, 1.61, 1.97];
		const tmpColor = new Color();

		//Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
		for(var s = 0; s < 3; s++){
			//Draw.color(colors[s]);
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.5, 0.1)));
			for(var i = 0; i < 3; i++){
				Lines.stroke((3 + Mathf.absin(Time.time(), 3.2, 1)) * strokes[s] * tscales[i]);
				Tmp.v1.trns(b.rot() + 180, lengthB * lenscales[i] / 2);
				//Lines.lineAngleCenter(b.x, b.y, b.rot(), 5 * lenscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), lengthB * lenscales[i], CapStyle.none);
			}
		};
		Draw.reset();
	}
});
unitEnvahisseurBullett.speed = 8;
unitEnvahisseurBullett.damage = 12;
unitEnvahisseurBullett.lifetime = 24;
unitEnvahisseurBullett.splashDamageRadius = 20;
unitEnvahisseurBullett.splashDamage = 8;
unitEnvahisseurBullett.hitSize = 8;
unitEnvahisseurBullett.bulletWidth = 7;
unitEnvahisseurBullett.bulletHeight = 9;
unitEnvahisseurBullett.bulletShrink = 0;
unitEnvahisseurBullett.keepVelocity = true;

const envahisseurFinalEffect = extend(BasicBulletType, {
	range: function(){
		return 130;
	},
	
	despawned: function(b){
		for(var i = 0; i < 12; i++){
			Bullet.create(this.frags[Mathf.round(Mathf.random(0, 3))], b, b.x, b.y, b.rot() + Mathf.range(32.0), Mathf.random(0.75, 1.25));
		}
	},
	
	draw: function(b){}
});
envahisseurFinalEffect.speed = 0.001;
envahisseurFinalEffect.damage = 300;
envahisseurFinalEffect.frags = [envahisseurBullet, unitEnvahisseurBullet, envahisseurBullett, unitEnvahisseurBullett];
envahisseurFinalEffect.lifetime = 8;
envahisseurFinalEffect.minRotation = 16;
envahisseurFinalEffect.widthOffset = 8;
envahisseurFinalEffect.lengthOffset = 8;
envahisseurFinalEffect.hitSize = 12;
envahisseurFinalEffect.collidesTiles = false;
envahisseurFinalEffect.collidesAir = false;
envahisseurFinalEffect.collides = false;
envahisseurFinalEffect.instantDisappear = true;
envahisseurFinalEffect.keepVelocity = false;
envahisseurFinalEffect.despawnEffect = Fx.none;
envahisseurFinalEffect.shootEffect = envahisseurShootEffect;
envahisseurFinalEffect.smokeEffect = Fx.none;

const envahisseurWeapon = extendContent(Weapon, "envahisseur", {});

envahisseurWeapon.reload = 15;
envahisseurWeapon.alternate = true;
envahisseurWeapon.length = 9;
envahisseurWeapon.width = 8.5;
envahisseurWeapon.recoil = 1.4;
envahisseurWeapon.bullet = envahisseurFinalEffect;
envahisseurWeapon.shootSound = Sounds.missile;
envahisseurWeapon.minPlayerDist = 35;

const envahisseur = extendContent(Mech, "envahisseur", {
	
	load: function(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
		this.legRegion = Core.atlas.find(this.name + "-leg");
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.lightRegion = Core.atlas.find(this.name + "-lights");
	},
	
	updateAlt: function(player){
		const vectA = new Vec2();
		const shift = Mathf.clamp(player.velocity().len(), 0, 2);
		
		for(var i = 0; i < 2; i++){
			const size = (this.engineSize * 1.5);
			var sn = Mathf.signs[i];
			vectA.trns(player.rotation - 90, 9.5 * sn, -3.75 + (shift * 2));
			Effects.effect(shipTrail, player.x + vectA.x, player.y + vectA.y, (size + Mathf.absin(Time.time(), 2, size / 4)) / 2);
			Effects.effect(envahisseurShootEffect, player.x + vectA.x, player.y + vectA.y, (size + Mathf.absin(Time.time(), 2, size / 4)) / 2);
		};
		vectA.trns(player.rotation + 90, 0, this.engineOffset - (shift * 2));
		Effects.effect(shipTrail, player.x + vectA.x, player.y + vectA.y, (size + Mathf.absin(Time.time(), 2, size / 4)) / 2);
	},
	
	draw: function(player){
		const vectA = new Vec2();
		const health = player.healthf();
		for(var i = 0; i < 2; i++){
			const size = (this.engineSize * 1.5);
			const sizeB = (size + Mathf.absin(Time.time(), 2, size / 4)) / 2;
			const shift = Mathf.clamp(player.velocity().len(), 0, 2);
			var sn = Mathf.signs[i];
			vectA.trns(player.rotation - 90, 9.5 * sn, -3.75);
			
			Draw.color(primeColor);
			Fill.circle(player.x + vectA.x, player.y + vectA.y, sizeB);
	
			vectA.trns(player.rotation - 90, 9.5 * sn, -3.75 + (shift / 1.5));
			Draw.color(Color.valueOf("ffffff"));
			Fill.circle(player.x + vectA.x, player.y + vectA.y, sizeB / 1.7);
		};
		
		Draw.color(Color.black, Color.white, health + Mathf.absin(Time.time(), health * 5.0, 1.0 - health));
		Draw.blend(Blending.additive);
		Draw.rect(this.lightRegion, player.x, player.y, player.rotation - 90);
		Draw.blend();
		Draw.reset();
	}
});

envahisseur.flying = true;
envahisseur.health = 470;
envahisseur.drag = 0.06;
envahisseur.speed = 0.50;
envahisseur.boostSpeed = 0.7;
envahisseur.mass = 5;
envahisseur.drillPower = 4;
envahisseur.shake = 4.5;
envahisseur.hitsize = 23;
envahisseur.weapon = envahisseurWeapon;
envahisseur.weaponOffsetX = 8.5;
envahisseur.weaponOffsetY = 6;
envahisseur.engineColor = primeColor;
envahisseur.engineOffset = 9;
envahisseur.engineSize = 5;
envahisseur.mineSpeed = 1.7;
envahisseur.buildPower = 1.6;
envahisseur.itemCapacity = 80;
envahisseur.localizedName = "Envahisseur";
envahisseur.description = "Shoots a bullet that turns weakened enemy blocks into your team.";

const envahisseurPad = extendContent(MechPad, "envahisseur-mech-pad", {});

envahisseurPad.mech = envahisseur;
envahisseurPad.buildTime = 1;
envahisseurPad.buildTime = 700;