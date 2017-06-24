document.addEventListener("DOMContentLoaded", function () {

    //Globals
    var dhPaper = document.querySelector(".dh-paper");
    var dhColorFrom = document.querySelectorAll(".dh-color-from");
    var dhColorTo = document.querySelectorAll(".dh-color-to");
    var dhGradient = document.querySelectorAll(".dh-gradient");
    var dhCode = document.querySelectorAll(".dh-code");
    var dhGrab = document.querySelectorAll(".dh-grab");
    var notifyPlank = document.querySelector(".dh-notify-plank");
    var backgroundImage = "background-image: ";
    var gradientType = "linear-gradient( 135deg, ";
    var gradientStart = " 0%, ";
    var gradientEnd = " 100%)";


    for (var i = 0; i < colorData.length; i++) {
        var seperator = document.createElement("h1");
        var seperatorText = document.createTextNode(colorData[i][0]);
        seperator.appendChild(seperatorText);
        dhPaper.appendChild(seperator);

        for (var j = 1; j < colorData[i].length; j++) {
            tempColorFrom = colorData[i][j][0];
            tempColorTo = colorData[i][j][1];
            var gotTwoColors = true;

            if (!tempColorTo) {
                gotTwoColors = false;
            }

            var nodeGradientBrick = document.createElement("div");
            nodeGradientBrick.classList.add("dh-gradient-brick");
            var nodeGradient = document.createElement("div");
            nodeGradient.classList.add("dh-gradient");

            if (gotTwoColors) {
                nodeGradient.style.backgroundImage = gradientType + tempColorFrom + gradientStart + tempColorTo + gradientEnd;;
            } else {
                nodeGradient.style.backgroundColor = tempColorFrom;
            }

            var nodeActions = document.createElement("div");
            nodeActions.classList.add("dh-actions");
            var nodeCode = document.createElement("span");
            nodeCode.classList.add("dh-code");
            nodeCode.dataset.colorFrom = tempColorFrom;

            var nodeGrab = document.createElement("span");
            nodeGrab.classList.add("dh-grab");
            nodeGrab.dataset.colorFrom = tempColorFrom;

            var nodeColors = document.createElement("div");
            nodeColors.classList.add("dh-colors");

            var nodeColorFrom = document.createElement("span");
            nodeColorFrom.classList.add("dh-color-from");
            var nodeColorFromText = document.createTextNode(tempColorFrom);

            if (gotTwoColors) {
                nodeCode.dataset.colorTo = tempColorTo;
                nodeGrab.dataset.colorTo = tempColorTo;
                var nodeColorToText = document.createTextNode(tempColorTo);
                
                var nodeColorTo = document.createElement("span");
                nodeColorTo.classList.add("dh-color-to");
                nodeColorTo.style.color = tempColorTo;

                nodeColors.appendChild(nodeColorTo);
                nodeColorTo.appendChild(nodeColorToText);
            }


            //Append to Paper
            nodeGradientBrick.appendChild(nodeGradient);
            nodeActions.appendChild(nodeCode);
            nodeActions.appendChild(nodeGrab);
            nodeGradient.appendChild(nodeActions);
            nodeColors.appendChild(nodeColorFrom);
            nodeColorFrom.appendChild(nodeColorFromText);
            nodeGradientBrick.appendChild(nodeColors);
            dhPaper.appendChild(nodeGradientBrick);
        }
    }

    window.onclick = function (event) {
        //Copy Code
        if (event.target.matches(".dh-code")) {
            var eventColorFrom = event.target.dataset.colorFrom;
            var eventColorTo = event.target.dataset.colorTo;
            var eventResult;

            if (eventColorTo) {
                eventResult = backgroundImage + gradientType + eventColorFrom + gradientStart + eventColorTo + gradientEnd + ";";
            } else {
                eventResult = eventColorFrom;
            }

            function dynamicNode() {
                var node = document.createElement("pre");
                node.style.position = "fixed";
                node.style.fontSize = "0px";
                node.textContent = eventResult;
                return node;
            };

            var node = dynamicNode();
            document.body.appendChild(node);

            var selection = getSelection();
            selection.removeAllRanges();
            var range = document.createRange();
            range.selectNodeContents(node);
            selection.addRange(range);

            document.execCommand('copy');
            selection.removeAllRanges();
            document.body.removeChild(node);

            function notifyClient() {
                notifyPlank.classList.add("dh-notify-plank");
                var notify = document.createElement("span");
                notify.classList.add("dh-notify", "dh-notify-animate");
                var notifyText = document.createTextNode("Code Copied 👍");
                notify.appendChild(notifyText);
                notifyPlank.appendChild(notify);
            }
            notifyClient();

            setTimeout(function () {
                var notify = document.querySelectorAll(".dh-notify");
                var notify = notify[0];
                notifyPlank.removeChild(notify);
            }, 5000);
        }
        
        //Grab Palette
        if (event.target.matches(".dh-grab")) {
            var eventColorFrom = event.target.dataset.colorFrom;
            var eventColorTo = event.target.dataset.colorTo;
            var canvas = document.createElement("canvas");
            canvas.width = "2000";
            canvas.height = "1000";
            var ctx = canvas.getContext("2d");

            if (eventColorTo) {
                var tempGradient = ctx.createLinearGradient(0, 0, 2000, 1000);
                tempGradient.addColorStop(0, eventColorFrom);
                tempGradient.addColorStop(1, eventColorTo);
                ctx.fillStyle = tempGradient;
            } else {
                ctx.fillStyle = eventColorFrom;
            }

            ctx.fillRect(0, 0, 2000, 1000);
            window.open(canvas.toDataURL());
        }
    }
});