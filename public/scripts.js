const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    document.getElementById('challenge-title').innerText = data.title;
    document.getElementById('failures-target').innerText = data.failuresTarget;
    document.getElementById('successes-target').innerText = data.successesTarget;
    document.getElementById('failures-count').innerText = data.failuresCount;
    document.getElementById('successes-count').innerText = data.successesCount;
};

document.addEventListener('DOMContentLoaded', function() {
    // Check if elements exist before adding event listeners to avoid errors on user view
    const titleInput = document.getElementById('title-input');
    if (titleInput) {
        titleInput.addEventListener('input', function() {
            const title = this.value;
            document.getElementById('challenge-title').innerText = title;
            updateData({ title });
        });
    }

    const failuresTargetInput = document.getElementById('failures-target-input');
    if (failuresTargetInput) {
        failuresTargetInput.addEventListener('input', function() {
            const failuresTarget = this.value;
            document.getElementById('failures-target').innerText = failuresTarget;
            updateData({ failuresTarget });
        });
    }

    const successesTargetInput = document.getElementById('successes-target-input');
    if (successesTargetInput) {
        successesTargetInput.addEventListener('input', function() {
            const successesTarget = this.value;
            document.getElementById('successes-target').innerText = successesTarget;
            updateData({ successesTarget });
        });
    }
});

let failuresCount = 0;
let successesCount = 0;

function increment(type) {
    if (type === 'failure') {
        failuresCount++;
        document.getElementById('failures-count').innerText = failuresCount;
        updateData({ failuresCount });
    } else if (type === 'success') {
        successesCount++;
        document.getElementById('successes-count').innerText = successesCount;
        updateData({ successesCount });
    }
}

function confirmReset() {
    document.getElementById('reset-confirmation').style.display = 'flex';
}

function reset(confirm) {
    if (confirm) {
        failuresCount = 0;
        successesCount = 0;
        document.getElementById('failures-count').innerText = failuresCount;
        document.getElementById('successes-count').innerText = successesCount;
        updateData({ failuresCount, successesCount });
    }
    document.getElementById('reset-confirmation').style.display = 'none';
}

function updateData(updates) {
    const data = {
        title: document.getElementById('challenge-title').innerText,
        failuresTarget: document.getElementById('failures-target').innerText,
        successesTarget: document.getElementById('successes-target').innerText,
        failuresCount,
        successesCount,
        ...updates,
    };
    ws.send(JSON.stringify(data));
}
