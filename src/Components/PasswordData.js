import React, { useState } from 'react';
import { MdContentCopy } from "react-icons/md";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";

function PasswordData() {
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
    const [passwordLength, setPasswordLength] = useState(8);
    const [generatedPassword, setGeneratedPassword] = useState('');


    const generatePassword = () => {
        setIncludeUppercase(false);
        setIncludeLowercase(false);
        setIncludeNumbers(false);
        setIncludeSpecialChars(false);
        setPasswordLength(8);

        let charset = '';
        let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let lower = 'abcdefghijklmnopqrstuvwxyz'
        let num = '0123456789'
        let spl = '!@#$%^&*()-_=+'
        let casesArr = []
        if (includeUppercase) casesArr.push("upper");
        if (includeLowercase) casesArr.push("lower");
        if (includeNumbers) casesArr.push("num");;
        if (includeSpecialChars) casesArr.push("spl");;
        if (casesArr.length <= 0) {
            casesArr = ["upper", "lower", "num", "spl"]
        }

        let casesObj = {
            upper: { val: upper, count: 26 },
            lower: { val: lower, count: 26 },
            num: { val: num, count: 10 },
            spl: { val: spl, count: 13 }
        }

        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        let pass = ""
        for (let i = 0; i < passwordLength; i++) {
            let ramdonChar = casesObj[casesArr[0]]["val"][Math.floor(Math.random() * casesObj[casesArr[0]]["count"])]
            let test = casesArr.shift()
            casesArr.push(test)
            pass += ramdonChar
        }
        console.log(pass);
        setGeneratedPassword(pass);

    }

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(generatedPassword);
    }

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #8e44ad, #3498db)' }}
        >
            <Box
                height={400}
                width={700}
                p={4}
                borderRadius={10}
                boxShadow={5}
                bgcolor="background.paper"
            >
                <Typography variant="h4" align="center" fontWeight="bold" mb={4} color="text.primary">
                    Random Password Generator
                </Typography>
                <Box mb={4}>
                    <FormGroup>
                        <Box display="flex" alignItems="center" >
                            <FormControlLabel control={<Checkbox checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} defaultChecked={false} color="primary" />} label="Include Uppercase (A-Z)" />
                            <Box mr={8}>
                                <TextField
                                    id="filled-number"
                                    label="Password Length"
                                    type="number"
                                    value={passwordLength}
                                    onChange={(e) => setPasswordLength(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    size='small'
                                    style={{
                                        marginLeft: '175px'
                                    }}
                                />
                            </Box>
                        </Box>
                        <FormControlLabel control={<Checkbox checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} defaultChecked={false} color="primary" />} label="Include Lowercase (a-z)" />
                        <FormControlLabel control={<Checkbox checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} defaultChecked={false} color="primary" />} label="Include Numbers (0-9)" />
                        <FormControlLabel control={<Checkbox checked={includeSpecialChars} onChange={(e) => setIncludeSpecialChars(e.target.checked)} defaultChecked={false} color="primary" />} label="Include Special Characters ($%&@)" />
                    </FormGroup>
                </Box>
                <Box display="flex" alignItems="center">
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        variant="outlined"
                        value={generatedPassword}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="copy password"
                                        onClick={handleCopyToClipboard}
                                        edge="end"
                                    >
                                        <MdContentCopy />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box ml={2}>
                        <Button variant="contained" color="primary" style={{ fontWeight: 'bold' }} onClick={generatePassword} >
                            Generate Password
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}

export default PasswordData;
