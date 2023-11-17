import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

const window = Dimensions.get('window');
const BLOCK_SIZE = Math.min(window.width / 30, window.height / 20);
const DISPLAY_WIDTH = BLOCK_SIZE * 25;
const DISPLAY_HEIGHT = BLOCK_SIZE * 15;

let SNAKE_SPEED = 150;

const DIRECTIONS = {
    LEFT: { x: -BLOCK_SIZE, y: 0, opposite: 'RIGHT' },
    RIGHT: { x: BLOCK_SIZE, y: 0, opposite: 'LEFT' },
    UP: { x: 0, y: -BLOCK_SIZE, opposite: 'DOWN' },
    DOWN: { x: 0, y: BLOCK_SIZE, opposite: 'UP' },
};

const colors = {
    white: '#C8C8C8',
    green: '#282828',
    red: '#D53250',
    black: '#007800',
};

function SnakeContent() {
    const [snake, setSnake] = useState([{
        x: Math.round(DISPLAY_WIDTH / 2 / BLOCK_SIZE) * BLOCK_SIZE,
        y: Math.round(DISPLAY_HEIGHT / 2 / BLOCK_SIZE) * BLOCK_SIZE
    }]);
    const [food, setFood] = useState(spawnFood([]));
    const [direction, setDirection] = useState(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            moveSnake();
        }, SNAKE_SPEED);
        return () => clearInterval(interval);
    }, [snake, direction]);

    function moveSnake() {
        if (!direction) return;

        const newSnake = [...snake];
        const head = { ...newSnake[newSnake.length - 1] };

        head.x += direction.x;
        head.y += direction.y;

        if (head.x < 0 || head.x >= DISPLAY_WIDTH || head.y < 0 || head.y >= DISPLAY_HEIGHT || snake.find(s => s.x === head.x && s.y === head.y)) {
            alert('Game Over');
            resetGame();
            return;
        }

        newSnake.push(head);

        if (score == 10)
            SNAKE_SPEED = 120;
        if (score == 20)
            SNAKE_SPEED = 75
        if (score > 30)
            SNAKE_SPEED = 50


        if (head.x === food.x && head.y === food.y) {
            setFood(spawnFood(newSnake));
            setScore(score + 1);
        } else {
            newSnake.shift();
        }

        setSnake(newSnake);
    }


    function resetGame() {
        setSnake([{ x: Math.round(DISPLAY_WIDTH / 2 / BLOCK_SIZE) * BLOCK_SIZE, y: Math.round(DISPLAY_HEIGHT / 2 / BLOCK_SIZE) * BLOCK_SIZE }]);
        setDirection(null);
        setFood(spawnFood([]));
        setScore(0);
    }

    function spawnFood(snakeBody) {
        let x, y;
        do {
            x = Math.floor(Math.random() * (DISPLAY_WIDTH / BLOCK_SIZE)) * BLOCK_SIZE;
            y = Math.floor(Math.random() * (DISPLAY_HEIGHT / BLOCK_SIZE)) * BLOCK_SIZE;
        } while (snakeBody.find(s => s.x === x && s.y === y));

        return { x, y };
    }

    function changeDirection(newDirection) {
        if (newDirection !== direction && newDirection.opposite !== direction) {
            setDirection(newDirection);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.gameBoard}>
                {snake.map((s, i) => (
                    <View key={i} style={[styles.snakeBlock, { top: s.y, left: s.x }]} />
                ))}
                <View style={[styles.foodBlock, { top: food.y, left: food.x }]} />
            </View>
            <Text style={styles.score}>Score: {score}</Text>
            <View style={styles.controls}>
                <TouchableOpacity onPress={() => changeDirection(DIRECTIONS.UP)} style={styles.upButton}>
                    <Text>UP</Text>
                </TouchableOpacity>
                <View style={styles.horizontalControls}>
                    <TouchableOpacity onPress={() => changeDirection(DIRECTIONS.LEFT)} style={styles.leftButton}>
                        <Text>LEFT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeDirection(DIRECTIONS.RIGHT)} style={styles.rightButton}>
                        <Text>RIGHT</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => changeDirection(DIRECTIONS.DOWN)} style={styles.downButton}>
                    <Text>DOWN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    gameBoard: {
        width: DISPLAY_WIDTH,
        height: DISPLAY_HEIGHT,
        position: 'relative',
        borderColor: colors.black,
        borderWidth: 1,
    },
    snakeBlock: {
        position: 'absolute',
        width: BLOCK_SIZE,
        height: BLOCK_SIZE,
        backgroundColor: colors.green,
    },
    foodBlock: {
        position: 'absolute',
        width: BLOCK_SIZE,
        height: BLOCK_SIZE,
        backgroundColor: colors.red,
    },
    score: {
        margin: 20,
        fontSize: 24,
    },
    controls: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    horizontalControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    upButton: { padding: 10, margin: 10 },
    downButton: { padding: 10, margin: 10 },
    leftButton: { padding: 10, margin: 10 },
    rightButton: { padding: 10, margin: 10 },
});

export default SnakeContent;
