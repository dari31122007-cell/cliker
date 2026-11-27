document.addEventListener('DOMContentLoaded', () => {
    const savedState = JSON.parse(localStorage.getItem('pinkClickerSave'));
    
    let score = savedState ? savedState.score : 0;
    let totalClicks = savedState ? savedState.totalClicks : 0;
    let clickPower = savedState ? savedState.clickPower : 1;
    let upgradeCost = savedState ? savedState.upgradeCost : 10;
    
    let autoPower = savedState ? savedState.autoPower : 0;
    let autoUpgradeCost = savedState ? savedState.autoUpgradeCost : 50;
    
    let achievementUnlocked = savedState ? savedState.achievementUnlocked : false;

    const scoreEl = document.getElementById('score');
    const totalClicksEl = document.getElementById('total-clicks');
    const clickPowerEl = document.getElementById('click-power');
    const autoPowerEl = document.getElementById('auto-power');
    const upgradeCostEl = document.getElementById('upgrade-cost');
    const autoUpgradeCostEl = document.getElementById('auto-upgrade-cost');
    
    const clickBtn = document.getElementById('click-btn');
    const upgradeBtn = document.getElementById('upgrade-btn');
    const autoUpgradeBtn = document.getElementById('auto-upgrade-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    const achievementMsg = document.getElementById('achievement-msg');

    function updateUI() {
        scoreEl.textContent = score;
        totalClicksEl.textContent = totalClicks;
        clickPowerEl.textContent = clickPower;
        autoPowerEl.textContent = autoPower;
        upgradeCostEl.textContent = upgradeCost;
        autoUpgradeCostEl.textContent = autoUpgradeCost;

        upgradeBtn.disabled = score < upgradeCost;
        autoUpgradeBtn.disabled = score < autoUpgradeCost;

        if (score >= 50 && !achievementUnlocked) {
            achievementUnlocked = true;
            achievementMsg.classList.remove('hidden');
        }

        saveGame();
    }

    function saveGame() {
        const state = {
            score, totalClicks, clickPower, upgradeCost,
            autoPower, autoUpgradeCost, achievementUnlocked
        };
        localStorage.setItem('pinkClickerSave', JSON.stringify(state));
    }

    clickBtn.addEventListener('click', () => {
        score += clickPower;
        totalClicks += 1;
        updateUI();
    });

    upgradeBtn.addEventListener('click', () => {
        if (score >= upgradeCost) {
            score -= upgradeCost;
            clickPower += 1;
            upgradeCost = Math.floor(upgradeCost * 1.5);
            updateUI();
        }
    });

    autoUpgradeBtn.addEventListener('click', () => {
        if (score >= autoUpgradeCost) {
            score -= autoUpgradeCost;
            autoPower += 1;
            autoUpgradeCost = Math.floor(autoUpgradeCost * 1.8);
            updateUI();
        }
    });

    resetBtn.addEventListener('click', () => {
        if (confirm('Ты уверена, что хочешь начать всё сначала? 🥺')) {
            localStorage.removeItem('pinkClickerSave');
            location.reload();
        }
    });

    setInterval(() => {
        if (autoPower > 0) {
            score += autoPower;
            updateUI();
        }
    }, 1000);

    if (achievementUnlocked) {
        achievementMsg.classList.remove('hidden');
    }
    updateUI();
});